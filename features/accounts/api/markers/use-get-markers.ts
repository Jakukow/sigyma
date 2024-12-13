import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetMarkers = (id?: number) => {
  const queryKey = id ? ["markers", id] : ["markers"];
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = id
        ? await client.api.markers.$get({ query: { id } }) // API z parametrem id
        : await client.api.markers.$get(); // API bez parametru id

      if (!response.ok) {
        throw new Error("Failed to fetch markers");
      }

      const data = await response.json();

      if ("marker" in data) {
        return [data.marker];
      } else if ("markerList" in data) {
        return data.markerList;
      } else {
        throw new Error("Unexpected response structure");
      }
    },
  });
  return query;
};
