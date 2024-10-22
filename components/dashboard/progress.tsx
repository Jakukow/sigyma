import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

export const Progress = () => {
  const progressed = true;
  const progressValue = 25;
  return (
    <div className="flex flex-col h-1/2 shadow rounded-3xl w-full justify-around items-center">
      <div className="ml-6 mt-6 text-center font-medium text-muted-foreground ">
        AVERAGE MONTHLY PROGRESS
      </div>
      <div
        className={cn(
          "flex flex-row ",
          progressed ? "text-emerald-400" : "text-red-600"
        )}
      >
        <div className="flex justify-center items-center font-semibold text-3xl">
          {progressed ? <ArrowUp size={40} /> : <ArrowDown size={40} />}
          {progressValue}%
        </div>
      </div>
      <span
        className={cn(
          "font-medium",
          progressed ? "text-emerald-400" : "text-red-600"
        )}
      >
        {progressed ? "GREAT WORK!" : "TRY HARDER!"}
      </span>
    </div>
  );
};
