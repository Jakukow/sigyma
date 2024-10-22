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
