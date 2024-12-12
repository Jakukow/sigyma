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

import { Textarea } from "../ui/textarea";
import { useCreateReview } from "@/features/accounts/api/reviews/use-create-review";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Review title is required.",
  }),
  description: z.string().min(1, {
    message: "Exercise description is required.",
  }),
  comfort: z.number().min(1).max(5, {
    message: "Please select a rating between 1 and 5.",
  }),
  cleanliness: z.number().min(1).max(5, {
    message: "Please select a rating between 1 and 5.",
  }),
  equipment: z.number().min(1).max(5, {
    message: "Please select a rating between 1 and 5.",
  }),
  atmosphere: z.number().min(1).max(5, {
    message: "Please select a rating between 1 and 5.",
  }),
});

export const WriteReviewModal = () => {
  const mutation = useCreateReview();
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "writeReview";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      cleanliness: 0,
      comfort: 0,
      equipment: 0,
      atmosphere: 0,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!data.id) return;
    const overallscore =
      (values.atmosphere +
        values.cleanliness +
        values.comfort +
        values.equipment) /
      4;

    mutation.mutate(
      {
        atmosphere: +values.atmosphere,
        body: values.description,
        title: values.title,
        cleanliness: +values.cleanliness,
        comfort: +values.comfort,
        equipment: +values.equipment,
        markerId: +data.id,
        overall: overallscore,
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
          <DialogTitle className="text-2xl text-center uppercase font-bold tracking-wide">
            Write your review
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim">
                      Review title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter review title"
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
                      Review description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 resize-none"
                        placeholder="Enter exercise description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comfort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim">
                      Comfort Rating
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            className={`w-10 h-10 ${
                              field.value === value
                                ? "prim text-white"
                                : "bg-white text-prim"
                            }`}
                            onClick={() => field.onChange(value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cleanliness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim">
                      Cleanliness Rating
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            className={`w-10 h-10 ${
                              field.value === value
                                ? "prim text-white"
                                : "bg-white text-prim"
                            }`}
                            onClick={() => field.onChange(value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim">
                      Equipment Rating
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            className={`w-10 h-10 ${
                              field.value === value
                                ? "prim text-white"
                                : "bg-white text-prim"
                            }`}
                            onClick={() => field.onChange(value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="atmosphere"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim">
                      Atmosphere Rating
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            className={`w-10 h-10 ${
                              field.value === value
                                ? "prim text-white"
                                : "bg-white text-prim"
                            }`}
                            onClick={() => field.onChange(value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                {mutation.isPending ? (
                  <Loader2 className="animate-spin" />
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
