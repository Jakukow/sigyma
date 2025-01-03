import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.goals)["delete-goal"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.goals)["delete-goal"]["$post"]
>["json"];

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log(json);
      const response = await client.api.goals["delete-goal"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {},
  });
  return mutation;
};
