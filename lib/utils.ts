import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TrainingDay = {
  day: string;
  trainings: {
    id: number;
    clerkId: string;
    planName: string;
  }[];
};
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export function TodayDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0"); // Dzień
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Miesiące są indeksowane od 0, więc dodajemy 1

  const weekday = daysOfWeek[today.getDay()]; // Pobiera dzień tygodnia (0 - niedziela, 6 - sobota)

  return `${day}.${month}, ${weekday}`;
}
export function avg(input: number[] | null | undefined): number {
  if (!input || input.length === 0) {
    return 0;
  }
  return input.reduce((sum, score) => sum + score, 0) / input.length;
}

export function formatRelativeDate(dateInput: Date | string): string {
  const inputDate = new Date(dateInput);
  const now = new Date();
  const differenceInMs = now.getTime() - inputDate.getTime();

  const differenceInSeconds = Math.floor(differenceInMs / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays === 0) {
    if (differenceInHours === 0) {
      if (differenceInMinutes === 0) {
        return "just now";
      }
      return `${differenceInMinutes} minute${
        differenceInMinutes > 1 ? "s" : ""
      } ago`;
    }
    return "today";
  } else if (differenceInDays === 1) {
    return "yesterday";
  } else if (differenceInDays < 7) {
    return `${differenceInDays} day${differenceInDays > 1 ? "s" : ""} ago`;
  } else if (differenceInDays < 30) {
    const weeks = Math.floor(differenceInDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (differenceInDays < 365) {
    const months = Math.floor(differenceInDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(differenceInDays / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}
export const transformPlanListToTrainingDays = (
  planList: {
    id: number;
    clerkId: string;
    planName: string;
    dayOfWeek: string;
  }[]
): TrainingDay[] => {
  const trainingDays: TrainingDay[] = daysOfWeek.map((day) => ({
    day,
    trainings: [],
  }));

  planList.forEach((plan) => {
    const index = daysOfWeek.indexOf(plan.dayOfWeek);
    if (index !== -1) {
      trainingDays[index].trainings.push({
        id: plan.id,
        clerkId: plan.clerkId,
        planName: plan.planName,
      });
    }
  });

  return trainingDays;
};

export const calculate1RM = (weight: number, reps: number): number => {
  const percentages = [
    1.0, 0.97, 0.94, 0.92, 0.89, 0.86, 0.83, 0.81, 0.78, 0.75, 0.73, 0.71, 0.7,
    0.68, 0.67, 0.65, 0.64, 0.63, 0.61, 0.6, 0.59, 0.58, 0.57, 0.56, 0.55, 0.54,
    0.53, 0.52, 0.51, 0.5,
  ];

  const percentage = percentages[Math.min(reps - 1, percentages.length - 1)];

  return Math.round(weight / percentage);
};

export const calculateRM = (
  weight: number,
  reps: number,
  targetReps: number
): number => {
  const percentageFunction = (reps: number): number => {
    if (reps <= 0) return 1;
    return 1 / (1.0278 - 0.0278 * reps);
  };

  const oneRM = weight * percentageFunction(reps);
  const targetWeight = oneRM / percentageFunction(targetReps);

  return Math.round(targetWeight);
};
// calculateRM(100, 8, 4) => Calculate weight for 4 reps based on 100kg for 8 reps
// calculateRM(100, 8, 1) => Calculate 1RM based on 100kg for 8 reps
// calculateRM(100, 8, 10) => Calculate weight for 10 reps based on 100kg for 8 reps
