"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useCreateMarker } from "@/features/accounts/api/markers/use-create-marker";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Gym name is required.",
  }),
  description: z.string().min(1, {
    message: "Address is required.",
  }),
});
export const CreateMarkerModal = () => {
  const mutation = useCreateMarker();
  const { isOpen, onClose, type, data } = useModal();
  const { lngLat } = data;
  const lng = lngLat?.lng;
  const lat = lngLat?.lat;
  const isModalOpen = isOpen && type === "createMarker";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!lat || !lng) return;

    mutation.mutate(
      {
        gymName: values.name,
        gymAdress: values.description,
        lat: lat.toString(),
        lng: lng.toString(),
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-prim p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold tracking-wide">
            ADD NEW GYM ON MAP
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim">
                      GYM NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter gym name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim ">
                      Gym Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter gym address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button className="w-24" variant="primary" disabled={isLoading}>
                {mutation.isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
