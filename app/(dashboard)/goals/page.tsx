"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Edit, GripHorizontal, Trash } from "lucide-react";
import { RadialChart } from "@/components/ui/radial-chart";
import { chartsDummy } from "@/lib/constants";

interface SortableItemProps {
  id: string;
  isDraggable: boolean;
  isDndEnabled?: boolean;
  children: React.ReactNode;
}

const SortableItem = ({
  id,
  isDraggable,
  isDndEnabled,
  children,
}: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { onOpen } = useModal();

  return (
    <div
      ref={setNodeRef}
      style={isDraggable ? style : undefined}
      className="bg-white shadow rounded-xl h-[18.9rem] relative"
    >
      {isDndEnabled && (
        <>
          <div className="flex flex-col absolute text-white top-3 left-2 gap-y-1 animate-fadeIn z-10">
            <Edit
              className="prim p-1 rounded-full cursor-pointer"
              onClick={() => onOpen("showMarker")}
            />
            <Trash className="bg-red-600 p-1 rounded-full cursor-pointer" />
          </div>
          <GripHorizontal
            className="absolute top-3 text-muted-foreground right-2 outline-none animate-fadeIn cursor-grab"
            {...(isDraggable ? attributes : {})}
            {...(isDraggable ? listeners : {})}
          />
        </>
      )}
      {children}
    </div>
  );
};

const GoalsPage = () => {
  const { onOpen } = useModal();
  const [items, setItems] = useState(chartsDummy);
  const [backupItems, setBackupItems] = useState([...items]);
  const [isDndEnabled, setIsDndEnabled] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const handleCancel = () => {
    setItems([...backupItems]);
    setIsDndEnabled(false);
  };

  const handleSave = () => {
    setBackupItems([...items]);
    setIsDndEnabled(false);
  };

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      setIsDndEnabled(true);
    } else {
      handleCancel();
    }
  };

  return (
    <div className="mt-11 mx-5 items-center justify-center flex w-full h-full max-h-[750px] shadow bg-white rounded-xl overflow-hidden">
      <div className="hidden md:w-1/3 h-full text-white font-bold md:flex prim">
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
      <div className="w-full md:w-2/3 h-full flex flex-col bg-white">
        <div className="prim w-full p-5 flex items-center gap-x-3 justify-between">
          <div className="flex gap-x-3">
            <span className="text-white/80 tracking-wider">Edit Layout</span>
            <Switch
              checked={isDndEnabled}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          {isDndEnabled ? (
            <div className="flex justify-end gap-3">
              <Button
                variant="prim"
                className="h-6 w-16 animate-fadeIn"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="flex md:hidden justify-end gap-3">
              <Button
                variant="prim"
                className="h-6  animate-fadeIn"
                onClick={() => onOpen("createGoal")}
              >
                SET A NEW GOAL
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
                    {items.map((goal) => (
                      <SortableItem
                        key={goal.id}
                        id={goal.id}
                        isDraggable={isDndEnabled}
                        isDndEnabled={isDndEnabled}
                      >
                        <RadialChart
                          exerciseName={goal.exerciseName}
                          score={goal.score}
                          color={goal.color}
                          unit={goal.unit}
                          goal={goal.goal}
                        />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                {items.map((goal) => (
                  <SortableItem
                    key={goal.id}
                    id={goal.id}
                    isDraggable={isDndEnabled}
                  >
                    <RadialChart
                      exerciseName={goal.exerciseName}
                      score={goal.score}
                      color={goal.color}
                      unit={goal.unit}
                      goal={goal.goal}
                    />
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
