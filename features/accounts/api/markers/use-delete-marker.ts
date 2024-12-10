import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<typeof client.api.markers.$delete>;
type RequestType = InferRequestType<typeof client.api.markers.$delete>["json"];

export const useDeleteMarker = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.markers.$delete({ json });
      console.log(response);

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
    },
    onError: () => {},
  });
  return mutation;
};
