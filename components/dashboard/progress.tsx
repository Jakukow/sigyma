"use client";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Progress = () => {
  const progressed = true;
  const value = 25;

  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let startValue = 0;
    const increment = value / (500 / 10); // zwiększamy wartość co 10ms

    const timer = setInterval(() => {
      if (progressed) {
        startValue += increment;
        if (startValue >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(startValue));
        }
      }
      if (!progressed) {
        console.log(increment);
        startValue += increment;
        if (startValue <= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(startValue));
        }
      }
    }, 10);

    return () => clearInterval(timer);
  }, [value, progressed]);
  return (
    <div className="flex flex-col h-1/2 shadow rounded-3xl w-full justify-around items-center">
      <div className="ml-6 mt-2 text-center font-semibold tracking-widest text-muted-foreground ">
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
          {displayValue}%
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
