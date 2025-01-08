import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useTrainingIntensity = () => {
  const query = useQuery({
    queryKey: ["intensity"],
    queryFn: async () => {
      const response = await client.api.dashboard["training-intensity"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { result } = await response.json();
      return result;
    },
  });
  return query;
};
