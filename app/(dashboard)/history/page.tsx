"use client";

import { useGetTrainingHistory } from "@/features/accounts/api/workouts/use-get-training-history";
import { formatRelativeDate } from "@/lib/utils";
import { Trash, History, Dumbbell, Loader2 } from "lucide-react";

const TrainingHistoryPage = () => {
  const trainingSessions = [
    {
      id: 1,
      name: "Session 1",
      date: "2025-01-04",
      results: [
        { exercise: "Bench Press", sets: 4, reps: 10, weight: 80 },
        { exercise: "Squat", sets: 4, reps: 8, weight: 100 },
        { exercise: "Deadlift", sets: 3, reps: 5, weight: 120 },
      ],
    },
    {
      id: 2,
      name: "Session 2",
      date: "2025-01-02",
      results: [
        { exercise: "Overhead Press", sets: 4, reps: 10, weight: 50 },
        { exercise: "Pull-ups", sets: 4, reps: 12, weight: 50 },
        { exercise: "Lunges", sets: 3, reps: 12, weight: 40 },
      ],
    },
    {
      id: 3,
      name: "Session 2",
      date: "2025-01-02",
      results: [
        { exercise: "Overhead Press", sets: 4, reps: 10, weight: 50 },
        { exercise: "Pull-ups", sets: 4, reps: 12, weight: 50 },
        { exercise: "Lunges", sets: 3, reps: 12, weight: 40 },
      ],
    },
  ];
  const sessions = useGetTrainingHistory();

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

      <ul className="flex flex-col w-full h-[40rem] no-scrollbar  p-6 space-y-6 overflow-auto">
        {!sessions.data
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
                  {session.results.map((result, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-gray-700 bg-gray-50 rounded-md p-3 border border-gray-200 shadow-sm"
                    >
                      <span className="font-medium w-1/3">
                        {result.exerciseName}
                      </span>
                      <span className="w-1/3 text-center">
                        {result.sets} sets x {result.reps} reps
                      </span>
                      <span className="w-1/3 text-right font-semibold text-gray-800">
                        {result.weight} kg
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete"
                    onClick={() => console.log(sessions.data)}
                  >
                    <Trash size={20} />
                    <span>Delete</span>
                  </button>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TrainingHistoryPage;
