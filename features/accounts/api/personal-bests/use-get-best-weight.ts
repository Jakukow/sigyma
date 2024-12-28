import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetBestWeight = (id: number) => {
  const query = useQuery({
    queryKey: ["best-exercise", id],
    queryFn: async () => {
      const response = await client.api["best-exercise"]["$get"]({
        query: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }

      const { exerciseList } = await response.json();
      return exerciseList;
    },
    enabled: !!id,
  });

  return query;
};
