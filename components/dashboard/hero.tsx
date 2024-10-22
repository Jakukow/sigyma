import { TodayDate } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export const Hero = async () => {
  const user = await currentUser();
  const todayDate = TodayDate();
  return (
    <div className="w-2/3 prim   border-4 border-[#9989e2] shadow rounded-3xl relative ">
      <div className="ml-10 mt-10 flex flex-col gap-y-5 ">
        <span className="font-light text-white tracking-wide text-5xl">
          Welcome
        </span>
        <span className="font-bold text-white tracking-wide text-5xl">
          {user?.fullName}!
        </span>
      </div>
      <div className=" ml-10 flex h-1/2 justify-between items-end w-full ">
        <span className="text-white text-3xl font-extralight ">
          {todayDate}
        </span>
        <div className="hidden lg:flex mr-16  ">
          <Image src="/hero.svg" alt="hero" width={360} height={360} />
        </div>
      </div>
    </div>
  );
};
