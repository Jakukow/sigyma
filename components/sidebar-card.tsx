import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <div className=" m-11   hidden md:flex flex-col w-64 gap-y-6">
      <div className="flex flex-col bg-white pl-10 pr-10 pt-7 pb-7  shadow rounded-2xl gap-y-4 ">
        <p>Traing</p>
      </div>
      <div className="flex flex-col bg-white p-10  shadow rounded-2xl gap-y-4 ">
        <p>Traing</p>
        <p>Goskdoakdoa</p>
        <p>dpasldpasl</p>
      </div>
      <div className="flex flex-col bg-white p-10  shadow rounded-2xl gap-y-4 ">
        <p>Traing</p>
        <p>Goskdoakdoa</p>
        <p>dpasldpasl</p>
      </div>
      <div className="flex flex-col bg-white p-10  shadow rounded-2xl gap-y-4 ">
        <p>Traing</p>
        <p>Goskdoakdoa</p>
        <p>dpasldpasl</p>
      </div>
    </div>
  );
}
