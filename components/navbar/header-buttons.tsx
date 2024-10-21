"use client";
import { Bell, Search } from "lucide-react";
export const NavbarButtons = () => {
  return (
    <div className="mr-5  flex gap-x-10">
      <button
        onClick={() => {}}
        className=" text-prim hover:-translate-y-1 transition-all"
      >
        <Search />
      </button>
      <button
        onClick={() => {}}
        className=" text-prim hover:-translate-y-1 transition-all"
      >
        <Bell />
      </button>
    </div>
  );
};
