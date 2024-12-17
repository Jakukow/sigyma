import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPlans = () => {
  const query = useQuery({
    queryKey: ["planlist"],
    queryFn: async () => {
      const response = await client.api.planlist.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { planList } = await response.json();
      return planList;
    },
  });
  return query;
};
