import { SidebarItemProps } from "@/lib/types";
import { SidebarItem } from "./sidebar-item";
import { Dispatch, SetStateAction } from "react";

interface SidebarCardProps {
  data: SidebarItemProps[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const SidebarCard = ({ data, setOpen }: SidebarCardProps) => {
  return (
    <div className="flex flex-col bg-white  w-full pt-4 pb-4  shadow rounded-2xl gap-y-4 ">
      {data.map((card, id) => {
        return (
          <SidebarItem
            setOpen={setOpen}
            label={card.label}
            path={card.path}
            Icon={card.Icon}
            key={id}
          />
        );
      })}
    </div>
  );
};
