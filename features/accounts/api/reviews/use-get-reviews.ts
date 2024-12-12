import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetReviews = (id: number) => {
  const query = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const response = await client.api.reviews.$get({ query: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { reviewList } = await response.json();
      return reviewList;
    },
    enabled: !!id,
  });
  return query;
};
