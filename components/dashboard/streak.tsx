"use client";
import { useGetStreak } from "@/features/accounts/api/dashboard/use-get-streak";
import { Check, Circle, Flame, Loader2 } from "lucide-react";

export const Streak = () => {
  const streakData = useGetStreak();
  const dayT = ["M", "T", "W", "T", "F", "S", "S"];
  if (streakData.isLoading) {
    return (
      <div className="flex flex-col h-1/2  py-6 shadow rounded-3xl justify-around bg-white">
        <Loader2 className="animate-spin text-prim m-auto" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-1/2  py-6 shadow rounded-3xl justify-around bg-white">
      <div className="flex flex-row h-1/2 mx-6 items-end justify-center">
        <Flame
          fill={`${(streakData?.data?.streakCount || 0) > 0 ? "red" : "gray"}`}
          className={` size-16  ${
            (streakData?.data?.streakCount || 0) > 0
              ? "animate-pulse text-orange-500"
              : "text-white"
          }`}
        />
        <div className="flex flex-col">
          <span className="font-bold text-gray-700 text-4xl">
            {streakData?.data?.streakCount ?? 0}
          </span>
          <span className="font-normal text-muted-foreground">Week streak</span>
        </div>
      </div>
      <div className=" mx-6  flex flex-row  justify-between h-[40%] ">
        {streakData?.data?.workoutDays.map((day, i) => {
          return day ? (
            <div
              key={i}
              className="flex flex-col items-center h-full justify-around"
            >
              <Check className="prim rounded-full  p-1 text-white animate-bounce" />
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
