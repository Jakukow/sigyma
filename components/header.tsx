import Image from "next/image";
import { Button } from "./ui/button";
import { Bell, Search } from "lucide-react";
import { UserAvatar } from "./user-avatar";

export const Header = () => {
  return (
    <header className=" flex items-center justify-between p-6 bg-blue-600 shadow-blue-800 shadow-sm">
      <Image
        alt="logotype"
        src="/logotype.svg"
        width={100}
        height={50}
        className="ml-5 hover:cursor-pointer"
      />
      <div className="mr-5 flex items-center gap-x-3">
        <Button
          variant="link"
          className=" text-white hover:-translate-y-1 transition-all"
        >
          <Search />
        </Button>
        <Button
          variant="link"
          className=" text-white hover:-translate-y-1 transition-all"
        >
          <Bell />
        </Button>

        <UserAvatar />
      </div>
    </header>
  );
};
