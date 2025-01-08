import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

type ResponseType = InferResponseType<typeof client.api.workout.$post>;
type RequestType = InferRequestType<typeof client.api.workout.$post>["json"];

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.workout.$post({ json });
      console.log(response);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", "best-exercise", "goals", "intensity"],
      });
    },
    onError: () => {},
  });
  return mutation;
};
