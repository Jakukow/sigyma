import Image from "next/image";

import { Bell, Search } from "lucide-react";
import { UserAvatar } from "./user-avatar";

export const Header = () => {
  return (
    <header className=" flex items-center justify-between p-6 bg-white">
      <Image
        alt="logotype"
        src="/logotype.svg"
        width={126}
        height={50}
        className="ml-5 hover:cursor-pointer"
      />
      <div className="mr-5 flex items-center gap-x-6">
        <div className="mr-5  flex gap-x-10">
          <button className=" text-prim hover:-translate-y-1 transition-all">
            <Search />
          </button>
          <button className=" text-prim hover:-translate-y-1 transition-all">
            <Bell />
          </button>
        </div>

        <UserAvatar />
      </div>
    </header>
  );
};
