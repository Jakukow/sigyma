"use client";
import { useDeleteExercise } from "@/features/accounts/api/exercises/use-delete-exercise";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

import { Edit, X } from "lucide-react";
import { useState } from "react";

interface ExerciseItemProps {
  name: string;
  description: string;
  unit: string;
  clerkId: string;
  id: number;
}

export const ExerciseItem = ({
  name,
  description,
  unit,
  clerkId,
  id,
}: ExerciseItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { onOpen } = useModal();
  const mutation = useDeleteExercise();

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      mutation.mutate(
        {
          clerkId,
          id,
        },
        {
          onSuccess: () => {},
        }
      );
    }, 500);
  };

  const handleEdit = () => {
    console.log("Ddsa");
    onOpen("editExercise", { unit, clerkId, id, description, name });
  };

  return (
    <div
      className={cn(
        "justify-between mx-2 items-center py-4 hover:opacity-70 transition-all gap-x-5 rounded-xl flex bg-white shadow",
        isDeleting ? "opacity-0 scale-95 transition-all duration-500" : ""
      )}
    >
      <div className="flex items-center w-full">
        <div className="flex flex-shrink-0 items-center w-1/3">
          <span className="ml-5 font-semibold tracking-widest text-muted-foreground">
            {name.toUpperCase()}{" "}
            <span className="text-xs text-muted-foreground font-normal">
              {" "}
              /{unit}
            </span>
          </span>
        </div>

        <div className="flex-grow pl-4">
          <p className="text-sm ">{description}</p>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center mr-4 gap-x-2",
          clerkId === "DEFAULT" ? "visibility-hidden pointer-events-none" : ""
        )}
      >
        <button onClick={handleEdit}>
          <Edit className="text-prim hover:-translate-y-1 transition-all" />
        </button>
        <button onClick={handleDelete}>
          <X className="prim text-white text-xs rounded-md hover:-translate-y-1 transition-all" />
        </button>
      </div>
    </div>
  );
};
