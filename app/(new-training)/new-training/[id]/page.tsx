"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGetPlanExercises } from "@/features/accounts/api/planlist/use-get-plan-exercise";
import { useCreateWorkout } from "@/features/accounts/api/workouts/use-create-workout";
import { useGetLatestResult } from "@/features/accounts/api/workouts/use-get-latest-result";

const schema = z.object({
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.array(
        z.object({
          reps: z
            .preprocess(
              (val) => Number(val),
              z.number().min(1, { message: "Reps must be a positive number" })
            )
            .optional(),
          weight: z.preprocess(
            (val) => Number(val),
            z.number().min(1, { message: "Weight must be a positive number" })
          ),
        })
      ),
    })
  ),
});

type TrainingFormSchema = z.infer<typeof schema>;

const TrainingPage = () => {
  const router = useRouter();
  const params = useParams();
  const mutate = useCreateWorkout();
  const sessionId = useGetLatestResult(+params.id);
  const exercsiseList = useGetPlanExercises(+params.id);

  const isLoading = exercsiseList.isLoading || sessionId.isLoading;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainingFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      exercises: exercsiseList.data
        ? exercsiseList.data.map((exercise) => ({
            name: exercise.exerciseName,
            sets: Array.from({ length: exercise.seriesNumber }, () => ({
              reps: exercise.exercisesUnit === "Seconds" ? undefined : 0,
              weight: 0,
            })),
          }))
        : [],
    },
  });

  const onSubmit: SubmitHandler<TrainingFormSchema> = (data) => {
    console.log("Form submitted with data:", data);

    const payload = {
      trainingId: +params.id,
      results: data.exercises.flatMap((exercise, exerciseIndex) => {
        const exerciseId = exercsiseList.data?.[exerciseIndex]?.exerciseId;

        if (!exerciseId) {
          console.error(
            `Exercise ID not found for exercise at index ${exerciseIndex}`
          );
          return [];
        }

        return exercise.sets.map((set, setIndex) => ({
          exerciseId,
          setNumber: setIndex + 1,
          reps: set.reps,
          weight: set.weight,
        }));
      }),
    };

    mutate.mutate(payload, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  if (isLoading || !exercsiseList.data) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="h-full flex justify-center w-[40rem] items-center">
          <div className="w-full max-w-lg mx-5 p-8 shadow bg-white rounded-3xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Complete the exercises
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6 min-h-[250px] max-h-[520px] no-scrollbar overflow-y-auto">
                {exercsiseList.data?.map((exercise, exIndex) => (
                  <div
                    key={exercise.id}
                    className="bg-gray-100 rounded-xl p-4 shadow-sm mx-2"
                  >
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                      {exercise.exerciseName}
                    </h2>

                    <ul className="space-y-2">
                      {[...Array(exercise.seriesNumber)].map((_, setIndex) => {
                        const previousSet = sessionId.data?.find(
                          (set) =>
                            set.exerciseId === exercise.exerciseId &&
                            set.setNumber === setIndex + 1
                        );

                        return (
                          <React.Fragment key={setIndex}>
                            <li className="flex items-center space-x-4">
                              <span className="font-medium text-gray-700 w-20">
                                Series {setIndex + 1}:
                              </span>
                              {exercise.exercisesUnit !== "Seconds" && (
                                <Controller
                                  control={control}
                                  name={`exercises.${exIndex}.sets.${setIndex}.reps`}
                                  render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                      <input
                                        {...field}
                                        type="number"
                                        value={field.value ?? 0}
                                        className={`w-16 p-2 border rounded-md text-center text-gray-700 bg-white focus:outline-none focus:ring-2 
                                          ${
                                            errors.exercises?.[exIndex]?.sets?.[
                                              setIndex
                                            ]?.weight
                                              ? "border-red-500 focus:ring-red-400"
                                              : "focus:ring-blue-400"
                                          }`}
                                      />
                                    </div>
                                  )}
                                />
                              )}
                              {exercise.exercisesUnit !== "Seconds" && (
                                <span className="text-gray-600">reps x</span>
                              )}{" "}
                              <Controller
                                control={control}
                                name={`exercises.${exIndex}.sets.${setIndex}.weight`}
                                render={({ field }) => (
                                  <div className="flex items-center space-x-2">
                                    <input
                                      {...field}
                                      type="number"
                                      className={`w-16 p-2 border rounded-md text-center text-gray-700 bg-white focus:outline-none focus:ring-2 
          ${
            errors.exercises?.[exIndex]?.sets?.[setIndex]?.weight
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-blue-400"
          }`}
                                    />
                                    <span className="text-gray-600">
                                      {exercise.exercisesUnit}
                                    </span>
                                  </div>
                                )}
                              />
                            </li>
                            {previousSet && (
                              <li>
                                <p className="text-xs text-right text-muted-foreground">
                                  Previous:{" "}
                                  {previousSet.reps &&
                                    `${previousSet.reps} reps x`}{" "}
                                  {previousSet.weight} {exercise.exercisesUnit}
                                </p>
                              </li>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-6 py-3 px-6 w-52 prim text-white font-semibold rounded-xl shadow-md"
                >
                  {mutate.isPending ? (
                    <Loader2 className="mx-auto animate-spin" />
                  ) : (
                    "Sumbit Workout"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/new-training")}
                  className="mt-6 py-3 px-6 text-prim font-semibold rounded-xl shadow-md"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
