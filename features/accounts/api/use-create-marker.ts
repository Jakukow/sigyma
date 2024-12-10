import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<typeof client.api.markers.$post>;
type RequestType = InferRequestType<typeof client.api.markers.$post>["json"];

export const useCreateMarker = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.markers.$post({ json });

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
    },
    onError: () => {},
  });
  return mutation;
};
