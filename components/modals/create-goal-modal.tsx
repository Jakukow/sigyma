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
import { useGetExercises } from "@/features/accounts/api/exercises/use-get-exercises";
import { Loader2 } from "lucide-react";
import { useCreateGoal } from "@/features/accounts/api/goals/use-create-goal";
import { useGetBestWeight } from "@/features/accounts/api/personal-bests/use-get-best-weight";
import { calculateRM } from "@/lib/utils";

const formSchema = z.object({
  exercise: z.string().min(1, {
    message: "Exercise name is required.",
  }),
  goal: z
    .string()
    .min(1, { message: "Goal is required." })
    .transform((value) => parseFloat(value)),
  color: z.string(),
  reps: z
    .string()
    .optional()
    .transform((value) => parseFloat(value || "1")),
});

export const CreateGoalModal = () => {
  const { data: exerciseList, isLoading: isLoadingExercise } =
    useGetExercises();

  const mutation = useCreateGoal();
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createGoal";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: "",
      goal: 0,
      reps: 1,
      color: "#a593f3",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(bestWeight);
    const goalWeight = calculateRM(
      +values.goal,
      values.reps ? +values.reps : 1,
      1
    );

    if (!bestWeight?.[0] || goalWeight > bestWeight[0].weight) {
      mutation.mutate(
        {
          color: values.color,
          weight: +values.goal,
          reps: values.reps ? +values.reps : 1,
          exerciseId: selectedExercise?.id || 0,
        },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    } else {
      if (goalWeight <= bestWeight[0]?.weight) {
        form.setError("goal", {
          message: "Goal weight must be higher than the current record.",
        });
      }
      if (!values.reps || +values.reps <= 0) {
        form.setError("reps", {
          message: "Reps must be a positive number.",
        });
      }
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };
  const selectedExercise = exerciseList?.find(
    (exercise) => exercise.exName === form.watch("exercise")
  );
  const { data: bestWeight, isLoading: isLoadingWeight } = useGetBestWeight(
    selectedExercise?.id || 0
  );

  const isLoading =
    form.formState.isSubmitting || isLoadingExercise || isLoadingWeight;

  if (isLoadingExercise) {
    return <Loader2 className="animate-spin" />;
  }

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
                        {exerciseList?.map((type) => (
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
                      Goal - {selectedExercise?.exUnit || "unit"}
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
              {selectedExercise?.exUnit === "Kilograms" && (
                <FormField
                  control={form.control}
                  name="reps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-medium text-prim ">
                        Goal - Reps
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
              )}
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
              <Button
                variant="primary"
                className="w-36"
                disabled={isLoading || mutation.isPending}
              >
                {mutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Goal"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
