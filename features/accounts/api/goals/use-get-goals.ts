import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetGoals = () => {
  const query = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await client.api.goals.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }
      const { goalsList } = await response.json();
      return goalsList;
    },
  });
  return query;
};
