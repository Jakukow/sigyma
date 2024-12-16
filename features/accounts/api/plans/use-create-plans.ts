import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<typeof client.api.plans.$post>;
type RequestType = InferRequestType<typeof client.api.plans.$post>["json"];

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.plans.$post({ json });
      console.log(response);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: () => {},
  });
  return mutation;
};
