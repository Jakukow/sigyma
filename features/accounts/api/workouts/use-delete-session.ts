import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.workout)["delete-session"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workout)["delete-session"]["$post"]
>["json"];

export const useDeleteSesion = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log(json);
      const response = await client.api.workout["delete-session"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["planlist", "plan-exercises"],
      });
    },
    onError: () => {},
  });
  return mutation;
};
