"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarData } from "@/lib/constants";
import { SidebarCard } from "./sidebar-card";
import { Menu } from "lucide-react";
import { useState } from "react";
export function AppSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" m-11   hidden md:flex flex-col w-64 gap-y-6">
        <div className="flex flex-col w-full h-16 text-lg shadow rounded-2xl gap-y-4 text-center text-white prim font-semibold  hover:bg-violet-400 hover:-translate-y-1 transition-all ">
          <button disabled={false} onClick={() => {}} className="h-full">
            New Workout
          </button>
        </div>
        <SidebarCard data={sidebarData.slice(0, 4)} setOpen={setOpen} />
        <SidebarCard data={sidebarData.slice(4, 7)} setOpen={setOpen} />
        <SidebarCard data={sidebarData.slice(7, 9)} setOpen={setOpen} />
      </div>
      <div className="flex md:hidden m-5">
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
    </>
  );
}
