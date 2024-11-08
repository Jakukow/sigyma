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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { exerciseList } from "@/lib/constants";

const currentScore = 20;

const formSchema = z.object({
  exercise: z.string().min(1, {
    message: "Exercise name is required.",
  }),
  goal: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0 && val > currentScore, {
      message: `Please select a score more than your personal best ${currentScore}`,
    }),
  color: z.string(),
});

export const CreateGoalModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createGoal";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: "",
      goal: 0,
      color: "#a593f3",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async () => {};

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-prim p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="uppercase text-2xl text-center font-bold tracking-wide">
            Set New Goal
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="exercise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim">
                      Exercise
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select an Exercise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {exerciseList.map((type) => (
                          <SelectItem
                            key={type.exName}
                            value={type.exName}
                            className="capitalize"
                          >
                            {type.exName.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim ">
                      Goal
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 resize-none"
                        placeholder="Enter your goal"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-medium text-prim ">
                      Chart Color
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 resize-none"
                        type="color"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
