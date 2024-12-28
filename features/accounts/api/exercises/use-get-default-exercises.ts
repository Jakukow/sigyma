import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetDefaultExercises = () => {
  const query = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await client.api.exercises["default"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { exercisesList } = await response.json();
      return exercisesList;
    },
  });
  return query;
};
