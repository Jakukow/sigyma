import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
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

type Exercise = {
  exercise: string;
  seriesNumber: number;
};

type FormValues = {
  planName: string;
  exercises: Exercise[];
};

type SortableItemProps = {
  id: string | number;
  children: ReactNode;
};

const formSchema = z.object({
  planName: z.string().min(1, { message: "Plan name is required." }),
  exercises: z
    .array(
      z.object({
        exercise: z.string().min(1, { message: "Exercise name is required." }),
        seriesNumber: z
          .number()
          .min(1, { message: "Minimum series number is required." }),
      })
    )
    .min(1, { message: "At least one exercise is required." }),
});

function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center">
        <span className="mr-2 cursor-grab" {...listeners}>
          <HiOutlineDotsVertical className="text-xl text-gray-500" />
        </span>
        {children}
      </div>
    </div>
  );
}

export const CreateTrainingModal = () => {
  const { isOpen, onClose, type, data: day } = useModal();
  const { description } = day;
  const isModalOpen = isOpen && type === "createTraining";
  const exerciseList = useGetExercises();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: "",
      exercises: [{ exercise: "", seriesNumber: 1 }],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log({ ...data, description });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-prim p-0 max-h-[80vh] h-full flex flex-col ">
        <DialogHeader className="pt-8 px-6 flex-shrink-0">
          <DialogTitle className="text-2xl text-center font-bold tracking-wide">
            ADD NEW TRAINING PLAN FOR {day.description?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        {exerciseList.isLoading ? (
          <Loader2 className="animate-spin mx-auto text-prim" />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 h-full justify-between pb-5"
            >
              <div className="space-y-8 px-6 flex-shrink-0">
                <FormField
                  control={form.control}
                  name="planName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-medium text-prim">
                        Training Plan Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter training plan title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext items={fields.map((field) => field.id)}>
                  <div className="overflow-y-auto px-6 space-y-4 flex-grow max-h-[40vh] no-scrollbar">
                    {fields.map((item, index) => (
                      <SortableItem key={item.id} id={item.id}>
                        <div className="space-y-4 border-b pb-4 mb-4 bg-white mr-2 w-full">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold">
                              Exercise {index + 1}
                            </h3>
                          </div>

                          <FormField
                            control={form.control}
                            name={`exercises.${index}.exercise`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="uppercase text-xs font-medium text-prim">
                                  Exercise Name
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
                                    {exerciseList.data.map((type) => (
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
                            name={`exercises.${index}.seriesNumber`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="uppercase text-xs font-medium text-prim">
                                  Series Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    disabled={isLoading}
                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-full"
                                    placeholder="Enter series number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value, 10)
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => remove(index)}
                              disabled={isLoading}
                              className="mt-2"
                            >
                              Remove Exercise
                            </Button>
                          )}
                        </div>
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <div className="flex justify-center items-center gap-x-4 ">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ exercise: "", seriesNumber: 1 })}
                  disabled={isLoading}
                >
                  Add Another Exercise
                </Button>

                <Button type="submit" variant="primary" disabled={isLoading}>
                  Create
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
