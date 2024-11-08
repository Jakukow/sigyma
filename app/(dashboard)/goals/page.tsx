"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { GripHorizontal } from "lucide-react";

const SortableItem = ({ id, children, isDraggable, isDndEnabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={isDraggable ? style : undefined}
      {...(isDraggable ? attributes : {})}
      {...(isDraggable ? listeners : {})}
      className="bg-white shadow rounded-xl h-[12.3rem] relative"
    >
      {isDndEnabled && (
        <GripHorizontal className="absolute top-3 text-muted-foreground right-2 animate-fadeIn" />
      )}
      {children}
    </div>
  );
};

const GoalsPage = () => {
  const { onOpen } = useModal();
  const [items, setItems] = useState(
    Array.from({ length: 9 }, (_, i) => `item-${i + 1}`)
  );
  const [backupItems, setBackupItems] = useState([...items]);
  const [isDndEnabled, setIsDndEnabled] = useState(false);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCancel = () => {
    setItems([...backupItems]); // Revert to the original order
    setIsDndEnabled(false); // Disable DnD mode
  };

  const handleSave = () => {
    setBackupItems([...items]); // Save the current order as the new backup
    setIsDndEnabled(false); // Disable DnD mode
  };

  const handleSwitchChange = (checked) => {
    if (checked) {
      setIsDndEnabled(true);
    } else {
      handleCancel(); // Revert to original order if toggling off
    }
  };

  return (
    <div className="mt-11 mx-5 items-center justify-center flex w-full h-full max-h-[750px] shadow bg-white rounded-xl overflow-hidden">
      <div className="w-1/3 h-full text-white font-bold flex prim">
        <div className="flex flex-col m-10 justify-around">
          <span className="md:tracking-widest text-xl md:text-5xl">
            SET YOUR GOALS
          </span>
          <Image
            src="/goals-hero.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-32 md:w-80 self-center"
          />
          <Button
            variant="prim"
            className="font-bold tracking-wider"
            onClick={() => onOpen("createGoal")}
          >
            <span className="hidden md:flex">SET A NEW GOAL</span>
            <span className="flex md:hidden">+</span>
          </Button>
        </div>
      </div>
      <div className="w-2/3 h-full flex flex-col bg-white">
        <div className="prim w-full p-5 flex items-center gap-x-3 justify-between">
          <div className="flex gap-x-3">
            <span className="text-white/80 tracking-wider">Edit Layout</span>
            <Switch
              checked={isDndEnabled}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          {isDndEnabled && (
            <div className="flex justify-end gap-3">
              <Button
                variant="prim"
                className="h-6 w-16 animate-fadeIn"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          )}
        </div>
        <div className="flex m-4 h-full">
          <div className="bg-slate-200 rounded-xl w-full p-4 overflow-y-scroll no-scrollbar h-[650px]">
            {isDndEnabled ? (
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={items}>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                    {items.map((id) => (
                      <SortableItem
                        key={id}
                        id={id}
                        isDraggable={isDndEnabled}
                        isDndEnabled={isDndEnabled}
                      >
                        {id}
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                {items.map((id) => (
                  <SortableItem key={id} id={id} isDraggable={isDndEnabled}>
                    {id}
                  </SortableItem>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
