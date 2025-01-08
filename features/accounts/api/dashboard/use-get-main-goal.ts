import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useMainGoal = () => {
  const query = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await client.api.dashboard["main-goal"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { goal } = await response.json();
      return goal;
    },
  });
  return query;
};
