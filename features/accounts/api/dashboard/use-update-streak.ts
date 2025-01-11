import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.dashboard)["update-streak"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.dashboard)["update-streak"]["$post"]
>;

export const useUpdateStreak = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.dashboard["update-streak"]["$post"]();

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streak"] });
    },
    onError: () => {},
  });
  return mutation;
};
