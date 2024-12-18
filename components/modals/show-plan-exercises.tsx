"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

import { useGetExercises } from "@/features/accounts/api/planlist/use-get-plan-exercise";

export const ShowPlanExercisesModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const exercisesList = useGetExercises(data.id);

  const isModalOpen = isOpen && type === "showPlanExercise";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white h-[30rem]  h-max-[50rem] text-prim p-0 overflow-hidden text-center">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold tracking-wide">
            {data.description?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ul>
            {exercisesList.data?.map((ex) => {
              return (
                <li key={ex.id} className="text-xl my-4 ">
                  {ex.exerciseName} - {ex.seriesNumber} series
                </li>
              );
            })}
          </ul>
        </DialogDescription>
        <DialogFooter className="px-6 items-center">
          <Button className="w-44" onClick={handleClose} variant="primary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
