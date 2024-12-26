import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetProgressTraining = (id: number) => {
  const query = useQuery({
    queryKey: ["progress", id],
    queryFn: async () => {
      const response = await client.api.progress.$get({
        query: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }

      const { progress } = await response.json();
      return progress;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return query;
};
