import {
  ChartLine,
  ChevronRight,
  Dumbbell,
  Goal,
  LayoutDashboard,
  MapPin,
  Medal,
  PersonStanding,
  Route,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";

export function AppSidebar() {
  return (
    <div className=" m-11   hidden md:flex flex-col w-64 gap-y-6">
      <div className="flex flex-col pl-10 pr-10 pt-6 pb-6 text-lg shadow rounded-2xl gap-y-4 text-center text-white prim font-semibold">
        <p>New Workout</p>
      </div>
      <div className="flex flex-col bg-white  w-full pt-4 pb-4  shadow rounded-2xl gap-y-4 ">
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <LayoutDashboard /> <p>Dashboard</p>
          </div>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <Route /> <p>Traning Plans</p>
          </div>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <Dumbbell /> <p>Exercises List</p>
          </div>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <ChartLine /> <p>Progress</p>
          </div>
          <ChevronRight />
        </Button>
      </div>
      <div className="flex flex-col bg-white  w-full pt-4 pb-4  shadow rounded-2xl gap-y-4 ">
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <PersonStanding /> <p>Friends</p>
          </div>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <Medal /> <p>Leaderboard</p>
          </div>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <Goal /> <p>Goals</p>
          </div>
          <ChevronRight />
        </Button>
      </div>
      <div className="flex flex-col bg-white  w-full pt-4 pb-4  shadow rounded-2xl gap-y-4  ">
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <MapPin /> <p>Gyms</p>
          </div>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className=" flex items-center justify-between mx-2"
        >
          <div className="flex items-center gap-x-2">
            <Star /> <p>Reviews</p>
          </div>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
