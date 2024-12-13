import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TodayDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0"); // Dzień
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Miesiące są indeksowane od 0, więc dodajemy 1
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = daysOfWeek[today.getDay()]; // Pobiera dzień tygodnia (0 - niedziela, 6 - sobota)

  return `${day}.${month}, ${weekday}`;
}
export function avg(input: number[] | null): number {
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
