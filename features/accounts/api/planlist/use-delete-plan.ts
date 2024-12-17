import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.planlist)["delete-plan"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.planlist)["delete-plan"]["$post"]
>["json"];

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.planlist["delete-plan"]["$post"]({
        json,
      });
      console.log(response);

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planlist"] });
    },
    onError: () => {},
  });
  return mutation;
};
