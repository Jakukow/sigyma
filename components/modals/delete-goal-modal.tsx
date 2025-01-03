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
import { Loader2 } from "lucide-react";

import { useDeleteGoal } from "@/features/accounts/api/goals/use-delete-goal";

export const DeleteGoalModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const mutation = useDeleteGoal();
  const handleDelete = () => {
    if (!data.id) return;
    mutation.mutate(
      { id: data.id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const isModalOpen = isOpen && type === "deleteGoal";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-prim p-0 overflow-hidden text-center">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold tracking-wide">
            {data.name?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col gap-y-2">
            <span>Are you sure to remove the set goal? </span>
          </div>
        </DialogDescription>
        <DialogFooter className="px-6 py-4">
          <Button
            className="w-32"
            disabled={mutation.isPending}
            onClick={handleDelete}
            variant="destructive"
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Remove Goal"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
