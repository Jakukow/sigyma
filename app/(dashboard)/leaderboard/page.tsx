"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { SinglePosition } from "@/components/leaderboard/single-position";
import { useGetDefaultExercises } from "@/features/accounts/api/exercises/use-get-default-exercises";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetBestWeight } from "@/features/accounts/api/personal-bests/use-get-best-weight";

const LeaderboardPage = () => {
  const { data: exerciseList, isLoading } = useGetDefaultExercises();
  const [selectedEx, setSelectedEx] = useState<number | null>(null);
  const { data: leaderboard, isLoading: isLoadingLeaderboard } =
    useGetBestWeight(selectedEx || 0);

  const selectedExUnit = exerciseList?.find((x) => x.id === selectedEx)?.exUnit;

  useEffect(() => {
    if (exerciseList?.length) {
      setSelectedEx(exerciseList[0].id);
    }
  }, [exerciseList]);

  if (isLoading) {
    return <Loader2 className="animate-spin text-white " />;
  }

  return (
    <div className="mt-11 mx-5 items-center flex flex-col w-full h-full shadow prim rounded-xl overflow-hidden">
      <div className="hidden xs:flex text-white tracking-wider mt-10 mx-4">
        <div className="flex-col items-center flex">
          <span>{leaderboard?.[1]?.clerkId?.slice(0, 10) || "Empty Slot"}</span>
          <Separator className="w-1/2" />
          <span className="font-bold">
            {leaderboard?.[1]?.bestWeight || "-"}
          </span>
          <Image
            src="/podium2.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
        <div className="flex-col items-center flex">
          <span className="max-w-40">
            {leaderboard?.[0]?.clerkId?.slice(0, 10) || "Empty Slot"}
          </span>
          <Separator className="w-1/2" />
          <span className="font-bold">
            {leaderboard?.[0]?.bestWeight || "-"}
          </span>
          <Image
            src="/podium1.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
        <div className="flex-col items-center flex">
          <span>{leaderboard?.[2]?.clerkId?.slice(0, 10) || "Empty Slot"}</span>
          <Separator className="w-1/2" />
          <span className="font-bold">
            {leaderboard?.[2]?.bestWeight || "-"}
          </span>
          <Image
            src="/podium3.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
      </div>
      <div className="bg-white mx-4 flex rounded-t-xl shadow h-96 max-h-96 flex-col max-w-[512px] w-full  ">
        <div className="flex justify-center items-center py-2">
          <Select
            value={selectedEx?.toString() || "none"}
            onValueChange={(value) => setSelectedEx(Number(value))}
          >
            <SelectTrigger className="w-[180px] prim text-white font-medium tracking-wider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {!exerciseList?.length ? (
                <SelectItem value="none">No items</SelectItem>
              ) : (
                exerciseList.map((ex) => (
                  <SelectItem key={ex.id} value={ex.id.toString()}>
                    {ex.exName}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <ScrollArea className="flex items-center">
          <div className="flex justify-center bg-slate-200 m-2">
            <div className="m-2 flex-col flex w-full gap-y-2">
              {isLoadingLeaderboard ? (
                <Loader2 className="animate-spin mx-auto text-gray-500" />
              ) : leaderboard?.length ? (
                leaderboard.map((user, index) => (
                  <SinglePosition
                    key={user.id}
                    position={index + 1}
                    name={user.clerkId.slice(0, 10)}
                    score={user.bestWeight}
                    unit={selectedExUnit || "kg"}
                  />
                ))
              ) : (
                <span className="text-center text-gray-500">No data</span>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeaderboardPage;
