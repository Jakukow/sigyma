import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetLatestResult = (id: number) => {
  console.log(id);
  const query = useQuery({
    queryKey: ["workouts", id],
    queryFn: async () => {
      const response = await client.api.workout["get-latest-results"]["$get"]({
        query: { id },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }

      const { exerciseList } = await response.json();
      console.log(exerciseList);
      return exerciseList;
    },
    enabled: !!id,
  });

  return query;
};