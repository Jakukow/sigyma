import { Check, CheckCircle2, Circle, Flame } from "lucide-react";

export const Streak = () => {
  return (
    <div className="flex flex-col h-1/2  shadow rounded-3xl justify-around">
      <div className="flex flex-row h-1/2 mx-6 items-end">
        <Flame fill="red" className="text-orange-500 size-16" />
        <div className="flex flex-col">
          <span className="font-bold text-gray-700 text-4xl">13</span>
          <span className="font-normal text-muted-foreground">Week streak</span>
        </div>
      </div>
      <div className=" mx-6  flex flex-row  justify-between h-[40%] ">
        <div className="flex flex-col items-center h-full justify-around">
          <Check className="bg-emerald-400 rounded-full p-1 text-white " />
          <span className="text-muted-foreground/35 font-medium">M</span>
        </div>
        <div className="flex flex-col items-center h-full justify-around">
          <Check className="bg-emerald-400 rounded-full p-1 text-white " />
          <span className="text-muted-foreground/35 font-medium">T</span>
        </div>
        <div className="flex flex-col items-center h-full justify-around">
          <Circle
            className=" text-gray-400 bg-gray-400 rounded-full "
            fill="lightgray"
          />
          <span className="text-muted-foreground/35 font-medium">W</span>
        </div>
        <div className="flex flex-col items-center h-full justify-around">
          <Circle
            className=" text-gray-400 bg-gray-400 rounded-full "
            fill="lightgray"
          />
          <span className="text-muted-foreground/35 font-medium">T</span>
        </div>
        <div className="flex flex-col items-center h-full justify-around">
          <Circle
            className=" text-gray-400 bg-gray-400 rounded-full "
            fill="lightgray"
          />
          <span className="text-muted-foreground/35 font-medium">F</span>
        </div>
        <div className="flex flex-col items-center h-full justify-around">
          <Check className="bg-emerald-400 rounded-full p-1 text-white " />
          <span className="text-muted-foreground/35 font-medium">S</span>
        </div>
        <div className="flex flex-col items-center h-full justify-around">
          <Check className="bg-emerald-400 rounded-full p-1 text-white " />
          <span className="text-muted-foreground/35 font-medium">S</span>
        </div>
      </div>
    </div>
  );
};
