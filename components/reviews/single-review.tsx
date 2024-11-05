import { ReviewCircle } from "./review-circle";

export const SingleReview = () => {
  return (
    <div className="bg-white shadow flex  w-full py-5 rounded-xl">
      <div className="flex flex-col mx-5 gap-y-2 w-1/2">
        <h3 className="font-semibold text-lg">Jerona</h3>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis pariatur
          et ipsam sint inventore magni odio illum nihil, error, autem officia.
          Ullam, enim repudiandae ipsum quaerat exercitationem vero iste
          perspiciatis.
        </p>
        <span className="text-xs text-gray-500">Andrzej</span>
      </div>
      <div className="flex w-1/2 items-center gap-x-5">
        <ReviewCircle number={5} label="Comfort" />
        <ReviewCircle number={5} label="Cleanliness" />
        <ReviewCircle number={5} label="Equipment" />
        <ReviewCircle number={5} label="Atmosphere" />
      </div>
    </div>
  );
};
