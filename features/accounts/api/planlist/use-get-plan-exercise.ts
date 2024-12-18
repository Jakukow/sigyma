import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPlanExercises = (id: number) => {
  const query = useQuery({
    queryKey: ["plan-exercises", id],
    queryFn: async () => {
      const response = await client.api.planlist["get-exercises"]["$get"]({
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
