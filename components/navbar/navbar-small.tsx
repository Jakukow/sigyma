"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { sidebarData } from "@/lib/constants";
import { SidebarCard } from "../sidebar/sidebar-card";
import { useState } from "react";
export const NavbarSmall = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex lg:hidden m-5">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="prim text-white p-1 rounded-md">
            <Menu />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mt-6">
            <SidebarCard data={sidebarData.slice(0, 4)} setOpen={setOpen} />
            <SidebarCard data={sidebarData.slice(4, 7)} setOpen={setOpen} />
            <SidebarCard data={sidebarData.slice(7, 9)} setOpen={setOpen} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
