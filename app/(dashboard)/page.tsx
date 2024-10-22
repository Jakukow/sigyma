import { Goal } from "@/components/dashboard/goal";
import { Hero } from "@/components/dashboard/hero";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import { Progress } from "@/components/dashboard/progress";
import { Streak } from "@/components/dashboard/streak";

export default function Home() {
  return (
    <div className="mt-11  mr-11 flex flex-col w-full h-[full] gap-y-5">
      <div className="flex flex-row gap-x-5 w-full h-1/2">
        <Hero />
        <div className="w-1/3 shadow bg-orange-100 border-orange-200 border-4 rounded-3xl"></div>
      </div>
      <div className="flex flex-row w-full gap-x-6 h-1/2">
        <Goal />
        <Leaderboard />
        <div className="flex h-full flex-col w-[34%] gap-y-5">
          <Progress />
          <Streak />
        </div>
      </div>
    </div>
  );
}
