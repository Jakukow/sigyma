import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetStreak = () => {
  const query = useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      const response = await client.api.dashboard["get-streak"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { streakCount, workoutDays } = await response.json();
      return { streakCount, workoutDays };
    },
  });
  return query;
};
