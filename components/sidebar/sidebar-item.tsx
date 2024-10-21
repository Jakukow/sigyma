import { ChevronRight, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
interface PropsSidebar {
  Icon: LucideIcon;
  label: string;
  path: string;

  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarItem = ({ Icon, label, path, setOpen }: PropsSidebar) => {
  const pathname = usePathname();

  const router = useRouter();

  const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <Button
      variant="ghost"
      className={cn(
        " flex items-center text-muted-foreground justify-between mx-2 hover:bg-[#a593f3] hover:text-white",
        isActive ? "prim text-white font-semibold" : null
      )}
      onClick={() => {
        router.push(path);
        setOpen(false);
      }}
    >
      <div className="flex items-center gap-x-2">
        <Icon /> <p>{label}</p>
      </div>
      <ChevronRight />
    </Button>
  );
};
