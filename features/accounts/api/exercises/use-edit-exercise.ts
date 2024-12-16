import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.exercises)["edit-exercise"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.exercises)["edit-exercise"]["$post"]
>["json"];

export const useEditExercise = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.exercises["edit-exercise"]["$post"]({
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
