import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.exercises)["delete-exercise"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.exercises)["delete-exercise"]["$post"]
>["json"];

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.exercises["delete-exercise"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
    onError: () => {},
  });
  return mutation;
};
