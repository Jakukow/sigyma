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

const LeaderboardPage = () => {
  return (
    <div className="mt-11 mx-5 items-center justify-end flex flex-col w-full h-full shadow prim rounded-xl overflow-hidden">
      <div className="flex text-white tracking-wider mt-10 mx-4">
        <div className="flex-col  items-center  flex">
          <span>Jakub K.</span>
          <Separator className="w-1/2" />
          <span className="font-bold">90kg</span>
          <Image
            src="/podium2.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
        <div className="flex-col  items-center  flex">
          <span className="max-w-40">Jakub K.</span>
          <Separator className="w-1/2" />
          <span className="font-bold">110kg</span>
          <Image
            src="/podium1.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
        <div className="flex-col  items-center  flex">
          <span>Jakub K.</span>
          <Separator className="w-1/2" />
          <span className="font-bold">90kg</span>
          <Image
            src="/podium3.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
      </div>
      <div className="bg-white mx-4 flex  rounded-t-xl shadow h-96  max-h-96 flex-col    w-[28rem] md:w-[32rem]">
        <div className="flex justify-center items-center py-2 ">
          <Select defaultValue="dark">
            <SelectTrigger className="w-[180px] prim text-white font-medium tracking-wider ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Dead Lift</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <ScrollArea className="flex items-center   ">
          <div className="flex justify-center bg-slate-200  m-2 ">
            <div className="m-2 h  flex-col flex w-full  gap-y-2">
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <SinglePosition
                    key={index}
                    position={index + 1}
                    name="Jakub Kowolik"
                    score={120 - (index + 1) * 10}
                    unit="kg"
                  />
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeaderboardPage;
