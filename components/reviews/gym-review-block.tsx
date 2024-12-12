"use client";
import { avg } from "@/lib/utils";
import { ReviewStars } from "../review-stars";
import { useRouter } from "next/navigation";

interface ReviewItemProps {
  gymName: string;
  gymAdress: string;
  gymCity: string;
  scores: number[];
  id: number;
}

export const GymItemReview = ({
  gymName,
  gymAdress,
  gymCity,
  scores,
  id,
}: ReviewItemProps) => {
  const router = useRouter();
  return (
    <div
      className="flex w-full bg-gray-100 shadow justify-between cursor-pointer"
      onClick={() => {
        router.push(`/reviews/${id}`);
      }}
    >
      <div className=" rounded-lg p-4  h-32 flex flex-col justify-between">
        <h3 className="font-semibold text-lg">{gymName}</h3>
        <p className="text-sm text-gray-600">{gymAdress}</p>
        <span className="text-xs text-gray-500">{gymCity}</span>
      </div>
      <div className="flex flex-col gap-y-2 justify-center items-center  p-4">
        {scores.length === 0 ? (
          <p className="text-prim">Gym haven&apos;t been reviewed yet</p>
        ) : (
          <>
            {" "}
            <ReviewStars
              overallscore={avg(scores).toString()}
              size={1.25}
              color="text-prim"
            />
            <div className="flex gap-1 items-center">
              <span className="font-bold text-prim">{avg(scores)}</span>
              <span className="text-sm text-muted-foreground">
                out of {scores.length} scores
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
