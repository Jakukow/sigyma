"use client";

import { sidebarData } from "@/lib/constants";
import { SidebarCard } from "./sidebar-card";

import { useState } from "react";
import { useRouter } from "next/navigation";
export function AppSidebar() {
  const router = useRouter();

  const [, setOpen] = useState(false);
  return (
    <>
      <div className=" my-11 ml-11 mr-6  hidden lg:flex flex-col w-[20%] gap-y-6">
        <div className="flex flex-col w-full h-16 text-lg shadow rounded-2xl gap-y-4 text-center text-white prim font-semibold  hover:bg-violet-400 hover:-translate-y-1 transition-all ">
          <button
            disabled={false}
            onClick={() => {
              router.push("/new-training");
            }}
            className="h-full"
          >
            New Workout
          </button>
        </div>
        <SidebarCard data={sidebarData.slice(0, 4)} setOpen={setOpen} />
        <SidebarCard data={sidebarData.slice(4, 7)} setOpen={setOpen} />
        <SidebarCard data={sidebarData.slice(7, 9)} setOpen={setOpen} />
      </div>
    </>
  );
}
