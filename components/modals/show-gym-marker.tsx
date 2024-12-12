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
import { Loader2, Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useDeleteMarker } from "@/features/accounts/api/markers/use-delete-marker";

export const ShowMarkerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const mutation = useDeleteMarker();
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
  const clerkId = data.clerkId;
  const { user } = useUser();

  const isModalOpen = isOpen && type === "showMarker";

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
            <span>
              Gym is located at {data.description} street and has overall socre
              of{" "}
            </span>
            <div className="flex justify-center gap-x-2 items-center">
              <strong>4,5/5</strong>
              <Star className="size-5 text-prim " />
              <span>
                with <strong>132</strong> opinions
              </span>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter className="px-6 py-4">
          {clerkId === user?.id && (
            <Button
              className="w-44"
              disabled={mutation.isPending}
              onClick={handleDelete}
              variant="destructive"
            >
              {mutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Remove Marker"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
