import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.planlist)["update-plan"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.planlist)["update-plan"]["$post"]
>["json"];

export const useEditPlan = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.planlist["update-plan"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["planlist"] });
      queryClient.invalidateQueries({
        queryKey: ["plan-exercises", variables.plan.id],
      });
    },
    onError: () => {},
  });
  return mutation;
};
