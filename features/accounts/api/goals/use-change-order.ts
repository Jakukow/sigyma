import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.goals)["change-order"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.goals)["change-order"]["$post"]
>["json"];

export const useChangeOrder = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.goals["change-order"]["$post"]({
        json,
      });
      console.log(response);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {},
  });
  return mutation;
};
