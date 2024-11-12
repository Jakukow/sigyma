import { LeaderboardPosition } from "../leaderboard-position";

export const Leaderboard = () => {
  return (
    <div className="flex prim  w-full py-5 md:py-0 md:my-0 my-5 md:w-1/3 border-4 border-[#9989e2] items-center justify-evenly shadow rounded-3xl flex-col">
      <span className=" text-white tracking-wide font-semibold ">
        BENCH PRESS LEADERBOARD
      </span>
      <LeaderboardPosition />
    </div>
  );
};
