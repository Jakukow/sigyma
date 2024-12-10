import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetMarkers = () => {
  const query = useQuery({
    queryKey: ["markers"],
    queryFn: async () => {
      const response = await client.api.markers.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch markers");
      }
      const { markerList } = await response.json();
      return markerList;
    },
  });
  return query;
};
