"use client";

import { useMainGoal } from "@/features/accounts/api/dashboard/use-get-main-goal";
import CircularProgress from "../circ-progress";
import { Loader2 } from "lucide-react";

export const Goal = () => {
  const mainGoal = useMainGoal();

  if (mainGoal.isLoading) {
    return (
      <div className="flex bg-white h-full p-11 flex-col w-full md:w-1/3 shadow rounded-3xl items-center justify-between">
        <Loader2 className="animate-spin text-prim m-auto" />
      </div>
    );
  }
  return (
    <div className="flex bg-white h-full p-11 flex-col w-full md:w-1/3 shadow rounded-3xl items-center justify-between">
      {mainGoal.data?.length === 0 ? (
        <span className="m-auto font-semibold text-muted-foreground tracking-widest uppercase">
          No goal has been set
        </span>
      ) : (
        <>
          {" "}
          <span className="font-semibold tracking-widest text-muted-foreground">
            MAIN EXERCISE GOAL
          </span>
          <CircularProgress
            value={mainGoal?.data?.[0]?.actualweight ?? 0}
            maxValue={mainGoal?.data?.[0].weight ?? 0}
            unit={mainGoal?.data?.[0].unit}
          />
          <span className="font-semibold tracking-widest text-muted-foreground">
            {mainGoal?.data?.[0].exerciseName}
          </span>
        </>
      )}
    </div>
  );
};
