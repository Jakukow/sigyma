import { ReviewStars } from "../review-stars";

import { ReviewCircle } from "./review-circle";

export const SingleReview = () => {
  return (
    <div className="bg-white shadow flex gap-x-2  w-full py-5 rounded-xl">
      <div className="flex flex-col ml-5 gap-y-2 w-1/2">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-lg">Jerona</h3>
          <ReviewStars overallscore="3.4" size={1.25} color="text-prim" />
        </div>
        <span className="text-xs text-gray-500 -mt-2">Today</span>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis pariatur
          et ipsam sint inventore magni odio illum nihil, error, autem officia.
          Ullam, enim repudiandae ipsum quaerat exercitationem vero iste
          perspiciatis.
        </p>
        <span className="text-xs text-gray-500">Andrzej</span>
      </div>
      <div className="flex w-1/2 flex-col mr-5 justify-center items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  w-full gap-x-5">
          <ReviewCircle number={5} label="Comfort" />
          <ReviewCircle number={5} label="Cleanliness" />
          <ReviewCircle number={5} label="Equipment" />
          <ReviewCircle number={5} label="Atmosphere" />
        </div>
      </div>
    </div>
  );
};
