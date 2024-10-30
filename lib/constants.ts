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
    label: "Training Plan",
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

export const exerciseList = [
  {
    exName: "Deadlift",
    exDesc:
      "Loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor",
    exUnit: "Kilograms",
    default: true,
  },
  {
    exName: "Plank",
    exDesc:
      "Held in a push-up-like position, with the body's weight borne on forearms, elbows, and toes",
    exUnit: "Seconds",
    default: true,
  },
  {
    exName: "Back squat",
    exDesc:
      "The bar is held on the back of the body upon the upper trapezius muscle, near to the base of the neck",
    exUnit: "Kilograms",
    default: true,
  },
  {
    exName: "Pull up",
    exDesc:
      "Movement where the body is suspended by the hands, gripping a bar or other implement at a distance typically wider than shoulder-width, and pulled up",
    exUnit: "Kilograms",
    default: true,
  },
  {
    exName: "Custom Exercise 1",
    exDesc: "Custom descripiton 1",
    exUnit: "Kilograms",
    default: false,
  },
  {
    exName: "Custom Exercise 2",
    exDesc: "Custom descripiton 2",
    exUnit: "Seconds",
    default: false,
  },
  {
    exName: "Bench Press",
    exDesc:
      "Person presses a weight upwards while lying horizontally on a weight training bench.",
    exUnit: "Kilograms",
    default: true,
  },
];

interface TrainingDay {
  day: string;
  trainings: string[];
}

export const trainingsList: TrainingDay[] = [
  {
    day: "Monday",
    trainings: [""],
  },
  {
    day: "Tuesday",
    trainings: ["Allaala"],
  },
  {
    day: "Wednesday",
    trainings: ["Allaala", "Kaszana"],
  },
  {
    day: "Thursday",
    trainings: [""],
  },
  {
    day: "Friday",
    trainings: [""],
  },
  {
    day: "Saturday",
    trainings: ["Allaala", "Plecy kotka"],
  },
  {
    day: "Sunday",
    trainings: ["Allaala", "WARRRUUUUm"],
  },
];
