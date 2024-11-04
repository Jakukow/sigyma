import { ExerciseItem } from "@/components/exercise/exercise-item";
import { ExerciseNavbar } from "@/components/exercise/navbar/exercise-navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exerciseList } from "@/lib/constants";

const ExercisePage = () => {
  return (
    <div className="mt-11 mx-5 items-center justify-center flex flex-col w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <ExerciseNavbar />
      <div className=" flex h-full w-full items-center  ">
        <div className="flex h-[600px] w-full flex-col mx-4 bg-slate-100 rounded-xl ">
          <ScrollArea className="w-full">
            <div className="flex flex-col w-full h-full mt-2 gap-y-2">
              {exerciseList.map((ex) => {
                return (
                  <ExerciseItem
                    key={ex.exName}
                    name={ex.exName}
                    description={ex.exDesc}
                    unit={ex.exUnit}
                    defaultEx={ex.default}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
