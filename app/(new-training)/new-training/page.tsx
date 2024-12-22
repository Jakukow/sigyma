"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import {} from "@/components/ui/button";
import { useGetPlans } from "@/features/accounts/api/planlist/use-get-plans";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const NewTraining = () => {
  const planLists = useGetPlans();
  const router = useRouter();
  const name = useUser().user?.firstName;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [open, setOpen] = useState(false);

  const isTodaySelected = selectedDay === todayIndex;

  return (
    <div className="h-full flex justify-center items-center ">
      {planLists.isLoading || !name ? (
        <Loader2 className="animate-spin text-prim" />
      ) : (
        <div className="flex flex-col w-full   max-w-md mx-5 shadow bg-white rounded-3xl p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Hello, {name}
            </h1>
            <p className="text-gray-500 text-lg">{getGreeting()}</p>
          </div>

          {planLists.data?.filter(
            (x) => x.dayOfWeek === daysOfWeek[selectedDay]
          ).length === 0 ? (
            <div className=" h-96 flex items-center justify-center text-2xl text-muted-foreground">
              {" "}
              {daysOfWeek[selectedDay]} is rest day{" "}
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                {isTodaySelected
                  ? "Today's Workout:"
                  : `${daysOfWeek[selectedDay]}'s Workout:`}
              </h2>
              <ul className="space-y-2 overflow-y-auto h-80 no-scrollbar max-h-96">
                {planLists.data
                  ?.filter((x) => x.dayOfWeek === daysOfWeek[selectedDay])
                  .map((workout) => (
                    <li
                      onClick={() => router.push(`/new-training/${workout.id}`)}
                      key={workout.id}
                      className="flex items-center p-3 cursor-pointer bg-gray-100 mx-2 rounded-xl hover:bg-gray-200 shadow-sm transition-all text-gray-700 font-medium"
                    >
                      <span className="text-prim mr-2">•</span>
                      {workout.planName}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="flex w-full justify-between">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className=" py-3 px-6 prim text-white font-semibold rounded-xl shadow-md focus:outline-none transition-transform transform hover:scale-105">
                  Missed a day?
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-4 bg-white shadow-lg rounded-lg w-48">
                <h3 className="text-gray-800 font-semibold mb-2">
                  Select a day
                </h3>
                <ul className="space-y-1">
                  {daysOfWeek.map((day, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setSelectedDay(index);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          selectedDay === index
                            ? "prim text-white"
                            : "text-gray-700"
                        } hover:bg-blue-100`}
                      >
                        {day}
                      </button>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
            <button
              onClick={() => router.push("/")}
              className=" py-3 px-6  text-prim border-2 font-semibold rounded-xl shadow-md focus:outline-none transition-transform transform hover:scale-105"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTraining;
