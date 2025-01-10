import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAvgProgress = () => {
  const query = useQuery({
    queryKey: ["avg"],
    queryFn: async () => {
      const response = await client.api.dashboard["avg-progress"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { progress } = await response.json();
      return progress;
    },
  });
  return query;
};
