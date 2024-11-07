import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const LeaderboardPage = () => {
  return (
    <div className="mt-11 mx-5 items-center justify-end flex flex-col w-full h-full shadow prim rounded-xl overflow-hidden">
      <div className="flex text-white tracking-wider mt-10 mx-4">
        <div className="flex-col  items-center  flex">
          <span>Adam K.</span>
          <Separator className="w-1/2" />
          <span className="font-bold">80kg</span>
          <Image
            src="/podium2.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
        <div className="flex-col  items-center  flex">
          <span className="max-w-40">Mateusz K.</span>
          <Separator className="w-1/2" />
          <span className="font-bold">120kg</span>
          <Image
            src="/podium1.svg"
            alt="podium1"
            width={1}
            height={1}
            className="w-40"
          />
        </div>
        <div className="flex-col  items-center  flex">
          <span>Mateusz K.</span>
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
      <div className="bg-white mx-4 flex  rounded-t-xl shadow h-96  max-h-96    w-[28rem] md:w-[32rem]">
        <ScrollArea className="w-full flex items-center  ">
          <div className="flex flex-col items-center w-full">
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
            <div>dsa</div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeaderboardPage;
