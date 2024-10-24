"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Search } from "lucide-react";

export const ExerciseNavbar = () => {
  const { onOpen } = useModal();
  return (
    <div className="w-full flex h-[9%] items-center justify-between prim">
      <span className=" hidden md:flex ml-10 font-semibold tracking-widest text-white">
        TUNE YOUR TRAINING
      </span>
      <button className="p-1 bg-[#8c7dcc] ml-10 md:ml-0 flex justify-between w-1/3 rounded-xl hover:-translate-y-1 transition-all">
        <span className="ml-3 text-white font-light">Search...</span>
        <Search className="mr-3 text-white" />
      </button>
      <Button
        onClick={() => onOpen("createExercise")}
        className="mr-10 bg-white text-prim hover:bg-slate-100"
      >
        Add new exercise
      </Button>
    </div>
  );
};
