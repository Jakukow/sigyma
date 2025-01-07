"use client";
import { motion } from "framer-motion";

import { useState } from "react";
import { useGetTrainingHistory } from "@/features/accounts/api/workouts/use-get-training-history";
import { formatRelativeDate } from "@/lib/utils";
import {
  Trash,
  History,
  Dumbbell,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useDeleteSesion } from "@/features/accounts/api/workouts/use-delete-session";

const TrainingHistoryPage = () => {
  const mutation = useDeleteSesion();
  const sessions = useGetTrainingHistory();
  const [expandedExercise, setExpandedExercise] = useState<null | string>(null);

  if (sessions.isLoading) {
    return <Loader2 className="animate-spin m-auto text-prim" />;
  }

  return (
    <div className="mt-11 mx-5 flex flex-col w-full h-full bg-gray-100 rounded-xl shadow-lg overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 prim border-b shadow-md">
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <History className="text-white" size={24} />
          <span>Training History</span>
        </h1>
      </div>

      <ul className="flex flex-col w-full h-[40rem] no-scrollbar p-6 space-y-6 overflow-auto">
        {!sessions.data?.length
          ? "No sessions found"
          : sessions.data.map((session) => (
              <li
                key={session.id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col space-y-4 "
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                    <Dumbbell className="text-prim" size={24} />
                    <span className="text-prim">{session.name}</span>
                  </h2>
                  <p className="text-gray-500 font-light text-sm">
                    {formatRelativeDate(session.date)}
                  </p>
                </div>

                <ul className="space-y-3">
                  {session.exercises.map((exercise) => (
                    <li
                      key={exercise.exerciseId}
                      className="border-b pb-4 mb-4"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() =>
                          setExpandedExercise(
                            expandedExercise ===
                              `${session.id}-${exercise.exerciseId}`
                              ? null
                              : `${session.id}-${exercise.exerciseId}`
                          )
                        }
                      >
                        <span className="font-medium min-w-[10rem]">
                          {exercise.exerciseName}
                        </span>
                        <span className="text-gray-500">
                          {exercise.totalSets} sets
                        </span>
                        {expandedExercise ===
                        `${session.id}-${exercise.exerciseId}` ? (
                          <ChevronUp className="text-gray-500" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-500" size={20} />
                        )}
                      </div>
                      {expandedExercise ===
                        `${session.id}-${exercise.exerciseId}` && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 space-y-2 overflow-hidden"
                        >
                          {exercise.series.map((set, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center text-gray-700 bg-gray-50 rounded-md p-3 border border-gray-200 shadow-sm"
                            >
                              <span>Set {set.setNumber}</span>
                              {set.reps ? (
                                <span>
                                  {set.reps} reps x {set.weight} kg
                                </span>
                              ) : (
                                <span>{set.weight} s </span>
                              )}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete"
                    onClick={() => mutation.mutate({ id: session.id })}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        {" "}
                        <Trash size={20} />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TrainingHistoryPage;
