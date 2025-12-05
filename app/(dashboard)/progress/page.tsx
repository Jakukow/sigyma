"use client";

import { Graph } from "@/components/graph";
import { GraphExercise } from "@/components/graph-exercise";
import { useGetExercises } from "@/features/accounts/api/exercises/use-get-exercises";
import { useGetPlans } from "@/features/accounts/api/planlist/use-get-plans";
import { useGetProgressExercise } from "@/features/accounts/api/progress/use-get-progress-by-exercisie";
import { useGetProgressTraining } from "@/features/accounts/api/progress/use-get-progress-by-training";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [trainingId, setTrainingId] = useState<null | string>(null);
  const [exerciseId, setExerciseId] = useState<null | string>(null);

  const { data: planLists, isLoading: isLoadingPlans } = useGetPlans();
  const { data: exerciseLists, isLoading: isLoadingExc } = useGetExercises();
  const { data: progressTraining, isLoading: isLoadingTrain } =
    useGetProgressTraining(trainingId ? +trainingId : 0);
  const { data: progressExercise, isLoading: isLoadingExercise } =
    useGetProgressExercise(exerciseId ? +exerciseId : 0);

  const isLoading = isLoadingExc || isLoadingPlans;

  return (
    <div className="mt-11 mx-5 items-cente xl:flex-row flex-col justify-center flex w-full h-full max-h-[750px] shadow bg-white rounded-xl overflow-hidden">
      {isLoading ? (
        <Loader2 className="animate-spin text-prim" />
      ) : (
        <>
          <div className=" xl:min-w-[380px] xl:w-1/3 h-[80px] xl:h-full w-full text-white font-bold flex prim">
            <div className="flex flex-row xl:flex-col p-2 xl:m-10 items-center gap-y-6 w-full">
              <h1 className="hidden xl:flex text-3xl text-center tracking-wider">
                CHOOSE TRAINING OR SINGLE EXERCISE
              </h1>
              <div className="relative flex w-auto xl:w-2/3 justify-center">
                <button
                  onClick={() => setActiveTab(0)}
                  className={` p-1 sm:p-2 text-xs sm:text-md w-1/2 text-center z-10 border-2 border-r-0 rounded-l-xl ${
                    activeTab === 0 ? "text-prim" : "text-white"
                  }`}
                >
                  Training
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`p-1 sm:p-2 text-xs sm:text-md w-1/2 text-center z-10 border-2 border-l-0 rounded-r-xl ${
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

              <div className="xl:flex hidden bg-black/10  w-full h-[32rem] mt-2 rounded-xl no-scrollbar1 overflow-y-auto">
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

              <div className="xl:hidden w-full flex justify-center ">
                <Select
                  value={activeTab === 0 ? trainingId || "" : exerciseId || ""}
                  onValueChange={(value) =>
                    activeTab === 0
                      ? setTrainingId(value)
                      : setExerciseId(value)
                  }
                >
                  <SelectTrigger className="w-2/3 bg-white text-prim font-medium tracking-wider">
                    <SelectValue
                      placeholder={
                        activeTab === 0 ? "Select Training" : "Select Exercise"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTab === 0 ? (
                      !planLists?.length ? (
                        <SelectItem value="none" disabled>
                          No plans available
                        </SelectItem>
                      ) : (
                        planLists.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id.toString()}>
                            {plan.planName}
                          </SelectItem>
                        ))
                      )
                    ) : !exerciseLists?.length ? (
                      <SelectItem value="none" disabled>
                        No exercises available
                      </SelectItem>
                    ) : (
                      exerciseLists.map((ex) => (
                        <SelectItem key={ex.id} value={ex.id.toString()}>
                          {ex.exName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-2/3 h-full flex flex-col justify-center bg-white">
            {(!trainingId && activeTab === 0) ||
            (!exerciseId && activeTab === 1) ? (
              <p className="mx-auto text-prim font-bold text-4xl">
                Select Your Progression
              </p>
            ) : (
              <div className="flex m-4 h-full ">
                {activeTab === 0 && !isLoadingTrain ? (
                  <div className="bg-slate-200 rounded-xl flex py-4 items-center justify-center w-full">
                    {isLoadingTrain ? (
                      <Loader2 className="animate-spin text-prim" />
                    ) : progressTraining?.length === 0 ? (
                      <p className="mx-auto text-prim font-bold text-4xl">
                        No activity detected
                      </p>
                    ) : (
                      <Graph chartData={progressTraining || []} />
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-200 rounded-xl flex py-4 items-center justify-center w-full">
                    {isLoadingExercise ? (
                      <Loader2 className="animate-spin text-prim" />
                    ) : progressExercise?.length === 0 ? (
                      <p className="mx-auto text-prim font-bold text-4xl">
                        No activity detected
                      </p>
                    ) : (
                      <GraphExercise chartData={progressExercise || []} />
                    )}
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
