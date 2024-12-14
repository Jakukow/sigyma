import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetExercises = (id?: number) => {
  const queryKey = id ? ["exercises", id] : ["exercises"];
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = id
        ? await client.api.exercises.$get({ query: { id } })
        : await client.api.exercises.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch markers");
      }

      const data = await response.json();

      if ("exercise" in data) {
        return [data.exercise];
      } else if ("exercisesList" in data) {
        return data.exercisesList;
      } else {
        throw new Error("Unexpected response structure");
      }
    },
  });
  return query;
};
