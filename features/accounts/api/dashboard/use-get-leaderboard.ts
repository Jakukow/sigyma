import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetLeaderboard = () => {
  const query = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const response = await client.api.dashboard["personal-bests"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { result } = await response.json();
      return result;
    },
  });
  return query;
};
