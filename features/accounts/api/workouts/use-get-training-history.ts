import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTrainingHistory = () => {
  const query = useQuery({
    queryKey: ["planlist", "plan-exercises"],
    queryFn: async () => {
      const response = await client.api.workout["training-history"]["$get"]();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { sessions } = await response.json();
      return sessions;
    },
  });
  return query;
};
