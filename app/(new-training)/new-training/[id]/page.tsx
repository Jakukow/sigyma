"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.array(
        z.object({
          reps: z.preprocess(
            (val) => Number(val),
            z.number().min(1, { message: "Reps must be a positive number" })
          ),
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
  const trainingName = "Full Body Workout"; // Name of the training
  const exercisesData = [
    {
      name: "Bench Press",
      previousSets: [
        { reps: 10, weight: 50 },
        { reps: 8, weight: 55 },
        { reps: 6, weight: 60 },
      ],
    },
    {
      name: "Squats",
      previousSets: [
        { reps: 12, weight: 80 },
        { reps: 10, weight: 85 },
        { reps: 8, weight: 90 },
      ],
    },
    {
      name: "Deadlift",
      previousSets: [
        { reps: 8, weight: 100 },
        { reps: 6, weight: 110 },
      ],
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainingFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      exercises: exercisesData.map((exercise) => ({
        name: exercise.name,
        sets: exercise.previousSets.map((set) => ({
          reps: set.reps,
          weight: set.weight,
        })),
      })),
    },
  });

  const onSubmit: SubmitHandler<TrainingFormSchema> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-lg mx-5 p-8 shadow bg-white rounded-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {trainingName}
        </h1>
        <p className="text-gray-600 mb-6">
          Complete the exercises as listed below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 min-h-[250px] max-h-[520px] no-scrollbar overflow-y-auto">
            {exercisesData.map((exercise, exIndex) => (
              <div
                key={exIndex}
                className="bg-gray-100 rounded-xl p-4 shadow-sm mx-2"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {exercise.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">Previous sets:</p>
                <ul className="space-y-2">
                  {exercise.previousSets.map((set, setIndex) => (
                    <li key={setIndex} className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">
                        Series {setIndex + 1}:
                      </span>
                      <Controller
                        control={control}
                        name={`exercises.${exIndex}.sets.${setIndex}.reps`}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <input
                              min={0}
                              {...field}
                              type="number"
                              placeholder={`${set.reps}`}
                              className="w-16 p-2 border rounded-md text-center text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <span className="text-gray-600">reps x</span>
                            {errors.exercises?.[exIndex]?.sets?.[setIndex]
                              ?.reps && (
                              <p className="text-red-500 text-xs mt-1">
                                {
                                  errors.exercises[exIndex].sets[setIndex].reps
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <Controller
                        control={control}
                        name={`exercises.${exIndex}.sets.${setIndex}.weight`}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <input
                              {...field}
                              min={0}
                              type="number"
                              placeholder={`${set.weight}`}
                              className="w-16 p-2 border rounded-md text-center text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <span className="text-gray-600">kgs</span>
                            {errors.exercises?.[exIndex]?.sets?.[setIndex]
                              ?.weight && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  errors.exercises[exIndex].sets[setIndex]
                                    .weight?.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 py-3 px-6 prim text-white font-semibold rounded-xl shadow-md"
          >
            Submit Workout
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainingPage;
