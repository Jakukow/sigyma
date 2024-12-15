"use client";
import { ExerciseItem } from "@/components/exercise/exercise-item";
import { ExerciseNavbar } from "@/components/exercise/navbar/exercise-navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetExercises } from "@/features/accounts/api/exercises/use-get-exercises";
import { Loader2 } from "lucide-react";

const ExercisePage = () => {
  const exercises = useGetExercises();

  return (
    <div className="mt-11 mx-5 items-center justify-center flex flex-col w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <ExerciseNavbar exercises={exercises} />
      <div className=" flex h-full w-full items-center  ">
        {exercises.isLoading ? (
          <Loader2 className="animate-spin text-prim self-center mx-auto" />
        ) : !exercises.data ? (
          <p>Something Went Wrong!</p>
        ) : (
          <div className="flex h-[600px] w-full flex-col mx-4 bg-slate-200 rounded-xl ">
            <ScrollArea className="w-full h-full">
              <div className="flex flex-col w-full h-full mt-2 gap-y-2">
                {exercises.data.map((ex) => {
                  return (
                    <ExerciseItem
                      id={ex.id}
                      key={ex.exName}
                      name={ex.exName}
                      description={ex.exDesc}
                      unit={ex.exUnit}
                      clerkId={ex.clerkId}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
