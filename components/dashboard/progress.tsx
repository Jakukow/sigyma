"use client";
import { useGetAvgProgress } from "@/features/accounts/api/dashboard/use-get-avg-progress";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Progress = () => {
  const progress = useGetAvgProgress();
  console.log(progress.data);
  const [displayValue, setDisplayValue] = useState(0);
  const value = progress.data ?? 0;
  const progressed = value > 0;

  useEffect(() => {
    if (progress.isFetching || progress.isError) return;

    let startValue = 0;
    const increment = value / (500 / 10);

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(startValue));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [value, progress.isFetching, progress.isError]);

  if (progress.isLoading) {
    return (
      <div className="bg-white flex flex-col h-1/2 shadow rounded-3xl w-full justify-around items-center">
        <Loader2 className="animate-spin text-prim" />
      </div>
    );
  }

  if (progress.isError) {
    return (
      <div className="bg-white flex flex-col h-1/2 shadow rounded-3xl w-full justify-around items-center">
        <span className="text-red-600 font-semibold">
          Error loading progress
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col h-1/2 shadow rounded-3xl w-full justify-around items-center">
      <div className="ml-6 mt-2 text-center font-semibold tracking-widest text-muted-foreground">
        AVERAGE MONTHLY PROGRESS
      </div>
      <div
        className={cn(
          "flex flex-row ",
          progressed ? "text-prim" : "text-red-600"
        )}
      >
        <div className="flex justify-center items-center font-semibold text-3xl">
          {progressed ? <ArrowUp size={40} /> : <ArrowDown size={40} />}
          {displayValue.toFixed(2)}%
        </div>
      </div>
      <span
        className={cn("font-medium", progressed ? "text-prim" : "text-red-600")}
      >
        {progressed ? "GREAT WORK!" : "TRY HARDER!"}
      </span>
    </div>
  );
};
