import { LeaderboardPosition } from "../leaderboard-position";

export const Leaderboard = () => {
  return (
    <div className="flex prim  w-1/3 border-4 border-[#9989e2] items-center justify-evenly shadow rounded-3xl flex-col">
      <span className=" text-white tracking-wide font-semibold ">
        BENCH PRESS LEADERBOARD
      </span>
      <LeaderboardPosition />
    </div>
  );
};
