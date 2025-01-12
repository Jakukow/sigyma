import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<typeof client.api.reviews.$post>;
type RequestType = InferRequestType<typeof client.api.reviews.$post>["json"];

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.reviews.$post({ json });
      return await response.json();
    },
    onSuccess: (_, variables) => {
      const { markerId } = variables;
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["markers", markerId] });
    },
    onError: () => {},
  });
  return mutation;
};
