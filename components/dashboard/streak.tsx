import { Check, Circle, Flame } from "lucide-react";

export const Streak = () => {
  const streak = [true, false, true, false, false, true, false];
  const dayT = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="flex flex-col h-1/2  shadow rounded-3xl justify-around">
      <div className="flex flex-row h-1/2 mx-6 items-end justify-center">
        <Flame fill="red" className="text-orange-500 size-16" />
        <div className="flex flex-col">
          <span className="font-bold text-gray-700 text-4xl">13</span>
          <span className="font-normal text-muted-foreground">Week streak</span>
        </div>
      </div>
      <div className=" mx-6  flex flex-row  justify-between h-[40%] ">
        {streak.map((day, i) => {
          return day ? (
            <div
              key={i}
              className="flex flex-col items-center h-full justify-around"
            >
              <Check className="prim rounded-full p-1 text-white animate-bounce" />
              <span className="text-muted-foreground/35 font-medium">
                {dayT[i]}
              </span>
            </div>
          ) : (
            <div
              key={i}
              className="flex flex-col items-center h-full justify-around"
            >
              <Circle
                className=" text-gray-400 bg-gray-400 rounded-full "
                fill="lightgray"
              />
              <span className="text-muted-foreground/35 font-medium">
                {dayT[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
