"use client";
import { useGetLeaderboard } from "@/features/accounts/api/dashboard/use-get-leaderboard";
import { LeaderboardPosition } from "../leaderboard-position";
import { Loader2 } from "lucide-react";

export const Leaderboard = () => {
  const leaderboard = useGetLeaderboard();

  if (leaderboard.isLoading) {
    return (
      <div className="flex prim  w-full py-5 md:py-0 md:my-0 my-5 md:w-1/3 border-4 border-[#9989e2] items-center justify-evenly shadow rounded-3xl flex-col">
        <Loader2 className="animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="flex prim  w-full py-5 md:py-0 md:my-0 my-5 md:w-1/3 border-4 border-[#9989e2] items-center justify-evenly shadow rounded-3xl flex-col">
      {leaderboard.data?.leaderBoard.length === 0 ? (
        <span className="text-white font-semibold">No results yet</span>
      ) : (
        <>
          <span className=" text-white tracking-wide uppercase font-semibold my-10 ">
            {leaderboard.data?.exerciseName} LEADERBOARD
          </span>
          <LeaderboardPosition
            leaderboard={leaderboard.data?.leaderBoard || []}
          />
        </>
      )}
    </div>
  );
};
