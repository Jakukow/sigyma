import Image from "next/image";

import { UserAvatar } from "../user-avatar";
import { NavbarSmall } from "./navbar-small";

export const Header = () => {
  return (
    <header className=" flex items-center justify-between p-6 bg-white">
      <NavbarSmall />
      <Image
        alt="logotype"
        src="/logotype.svg"
        width={126}
        height={50}
        className="ml-5 hover:cursor-pointer"
      />
      <div className="mr-5 flex items-center md:gap-x-6">
        <UserAvatar />
      </div>
    </header>
  );
};
