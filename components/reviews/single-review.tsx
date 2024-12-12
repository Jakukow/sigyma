import { formatRelativeDate } from "@/lib/utils";
import { ReviewStars } from "../review-stars";

import { ReviewCircle } from "./review-circle";

interface SingleReviewProps {
  title: string;
  body: string;
  createdAt: string;
  comfort: number;
  cleanliness: number;
  equipment: number;
  atmosphere: number;
  overall: number;
  username: string;
}

export const SingleReview = ({
  title,
  body,
  createdAt,
  comfort,
  cleanliness,
  equipment,
  atmosphere,
  overall,
  username,
}: SingleReviewProps) => {
  return (
    <div className="bg-white shadow flex gap-x-2  w-full py-5 rounded-xl">
      <div className="flex flex-col ml-5 gap-y-2 w-1/2">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-lg w-40">{title}</h3>
          <ReviewStars
            overallscore={`${overall}`}
            size={1.25}
            color="text-prim"
          />
        </div>
        <span className="text-xs text-gray-500 -mt-2">
          {formatRelativeDate(createdAt)}
        </span>
        <p className="text-sm text-gray-600">{body}</p>
        <span className="text-xs text-gray-500">{username}</span>
      </div>
      <div className="flex w-1/2 flex-col mr-5 justify-center items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  w-full gap-x-5">
          <ReviewCircle number={comfort} label="Comfort" />
          <ReviewCircle number={cleanliness} label="Cleanliness" />
          <ReviewCircle number={equipment} label="Equipment" />
          <ReviewCircle number={atmosphere} label="Atmosphere" />
        </div>
      </div>
    </div>
  );
};
