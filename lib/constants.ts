import {
  ChartLine,
  Dumbbell,
  Goal,
  LayoutDashboard,
  MapPin,
  Medal,
  PersonStanding,
  Route,
  Star,
} from "lucide-react";

export const sidebarData = [
  {
    Icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    Icon: Route,
    label: "Training Plans",
    path: "/plans",
  },
  {
    Icon: Dumbbell,
    label: "Exercise List",
    path: "/exercise",
  },
  {
    Icon: ChartLine,
    label: "Progress",
    path: "/progress",
  },
  {
    Icon: PersonStanding,
    label: "Friends",
    path: "/friends",
  },
  {
    Icon: Medal,
    label: "Leaderboard",
    path: "/leaderboard",
  },
  {
    Icon: Goal,
    label: "Goals",
    path: "/goals",
  },
  {
    Icon: MapPin,
    label: "Gyms",
    path: "/map",
  },
  {
    Icon: Star,
    label: "Reviews",
    path: "/reviews",
  },
];
