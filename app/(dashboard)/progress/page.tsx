"use client";

import { Graph } from "@/components/graph";
import { useGetExercises } from "@/features/accounts/api/exercises/use-get-exercises";
import { useGetPlans } from "@/features/accounts/api/planlist/use-get-plans";
import { useGetProgressTraining } from "@/features/accounts/api/progress/use-get-progress-by-training";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [trainingId, setTrainingId] = useState<null | string>(null);
  const [exerciseId, setExerciseId] = useState<null | string>(null);

  const { data: planLists, isLoading: isLoadingPlans } = useGetPlans();
  const { data: exerciseLists, isLoading: isLoadingExc } = useGetExercises();
  const { data: progressTraining, isLoading: isLoadingTrain } =
    useGetProgressTraining(trainingId ? +trainingId : 0);

  const isLoading = isLoadingExc || isLoadingPlans;

  return (
    <div className="mt-11 mx-5 items-center justify-center flex w-full h-full max-h-[750px] shadow bg-white rounded-xl overflow-hidden">
      {isLoading ? (
        <Loader2 className="animate-spin text-prim" />
      ) : (
        <>
          <div className="hidden md:w-1/3 h-full text-white font-bold md:flex prim">
            <div className="flex flex-col m-10 items-center gap-y-6">
              <h1 className="text-3xl text-center tracking-wider">
                CHOOSE TRAINING OR SINGLE EXERCISE
              </h1>
              <div className="relative flex w-2/3 justify-center">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`p-2 w-1/2 text-center z-10 border-2 border-r-0 rounded-l-xl ${
                    activeTab === 0 ? "text-prim" : "text-white"
                  }`}
                >
                  Training
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`p-2 w-1/2 text-center z-10 border-2 border-l-0 rounded-r-xl ${
                    activeTab === 1 ? "text-prim" : "text-white"
                  }`}
                >
                  Exercise
                </button>

                <span
                  className={`absolute h-full w-1/2 top-0 left-0 bg-white transition-all duration-500 ${
                    activeTab === 0 ? "rounded-l-xl" : "rounded-r-xl"
                  }`}
                  style={{
                    transform: `translateX(${activeTab * 100}%)`,
                  }}
                />
              </div>
              <div className="bg-black/10 flex w-full h-[32rem] mt-2 rounded-xl no-scrollbar1 overflow-y-auto">
                <div className="m-4 flex flex-col w-full gap-y-4">
                  {activeTab === 0
                    ? planLists?.map((plan) => (
                        <div
                          onClick={() => setTrainingId(plan.id.toString())}
                          className="flex bg-white rounded-xl justify-center text-prim py-4"
                          key={plan.id}
                        >
                          <span
                            className={`relative cursor-pointer ${
                              trainingId === plan.id.toString() ? "active" : ""
                            }`}
                          >
                            {plan.planName}
                          </span>
                        </div>
                      ))
                    : exerciseLists?.map((exercise) => (
                        <div
                          onClick={() => setExerciseId(exercise.id.toString())}
                          className="flex bg-white rounded-xl justify-center text-prim py-4"
                          key={exercise.id}
                        >
                          <span
                            className={`relative cursor-pointer ${
                              exerciseId === exercise.id.toString()
                                ? "active"
                                : ""
                            }`}
                          >
                            {exercise.exName}
                          </span>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 h-full flex flex-col justify-center bg-white">
            {(!trainingId && activeTab === 0) ||
            (!exerciseId && activeTab === 1) ? (
              <p className="mx-auto text-prim font-bold text-4xl">
                Select Your Progression
              </p>
            ) : (
              <div className="flex m-4 h-full">
                {activeTab === 0 && !isLoadingTrain ? (
                  <div className="bg-slate-200 rounded-xl flex items-center justify-center w-full">
                    {isLoadingTrain ? (
                      <Loader2 className="animate-spin text-prim" />
                    ) : (
                      <Graph chartData={progressTraining || []} />
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-200 rounded-xl flex items-center justify-center w-full">
                    <p>d</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressPage;
