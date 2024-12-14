"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

import { UseQueryResult } from "@tanstack/react-query";
import { Search } from "lucide-react";

interface Exercise {
  id: number;
  clerkId: string;
  exName: string;
  exDesc: string;
  exUnit: string;
}

interface ExerciseNavbarProps {
  exercises: UseQueryResult<Exercise[], Error>;
}

export const ExerciseNavbar = ({ exercises }: ExerciseNavbarProps) => {
  const { onOpen } = useModal();
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          disabled={exercises.isLoading}
          placeholder="Search your exercises..."
        />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Results">
            {exercises.data?.map((exercises) => {
              return (
                <CommandItem className="cursor-pointer" key={exercises.id}>
                  {exercises.exName}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="w-full flex h-[9%] items-center justify-between prim">
        <span className=" hidden md:flex ml-10 font-semibold tracking-widest text-white">
          TUNE YOUR TRAINING
        </span>

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="p-1 bg-[#8c7dcc] mx-4 flex justify-between w-full rounded-xl md:w-1/3  hover:-translate-y-1 transition-all"
        >
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
    </>
  );
};
