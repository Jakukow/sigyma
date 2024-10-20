import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Loader2, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";

export const UserAvatar = async () => {
  const user = await currentUser();
  const avatarfallback = user?.firstName;

  if (!user) {
    return (
      <div className="animate-spin">
        <Loader2 className="size-10" />
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8 text-white font-bold hover:-translate-y-1 transition-all">
          <AvatarFallback className="prim">
            {!!avatarfallback ? avatarfallback[0] : "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.firstName} Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <SignOutButton />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings /> Profile Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
