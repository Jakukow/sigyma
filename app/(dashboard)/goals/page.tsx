"use client";
import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";

const GoalsPage = () => {
  const { onOpen } = useModal();
  return (
    <div className="mt-11 mx-5 items-center justify-center flex  w-full h-full max-h-[750px] shadow bg-white rounded-xl overflow-hidden">
      <div className="w-1/3 h-full text-white font-bold  flex prim">
        <div className="flex flex-col m-10  justify-around">
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
        <div className="prim w-full p-4 flex item-center gap-x-3 justify-center">
          <span className="text-white/80 tracking-wider">Edit Layout</span>
          <Switch />
        </div>
        <div className="flex m-4 h-full ">
          <div className="bg-slate-200 rounded-xl w-full p-4 overflow-y-scroll no-scrollbar h-[650px]">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              {Array.from({ length: 14 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white shadow rounded-xl h-[12.5rem]"
                  >
                    dasd
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
