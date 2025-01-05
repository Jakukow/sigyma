"use client";

import { formatRelativeDate } from "@/lib/utils";
import { Trash, Eye } from "lucide-react";

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
  ];

  return (
    <div className="mt-11 mx-5 flex flex-col w-full h-full bg-gray-100 rounded-xl shadow overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 prim border-b">
        <h1 className="text-xl font-semibold text-white">Training History</h1>
      </div>

      <div className="flex flex-col w-full h-full p-4 space-y-4">
        {trainingSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {session.name}
                <p className="text-gray-500 font-light text-sm">
                  {formatRelativeDate(session.date)}
                </p>
              </h2>
              <ul className="space-y-2 w-full">
                {session.results.map((result, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <span className="font-medium w-40">{result.exercise}</span>
                    <span className="w-40 text-left">
                      {result.sets} sets x {result.reps} reps
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-3">
              <button
                className="prim text-white p-1 rounded-sm "
                aria-label="View"
              >
                <Eye size={20} />
              </button>
              <button
                className="bg-red-400 text-white p-1 rounded-sm"
                aria-label="Delete"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingHistoryPage;
