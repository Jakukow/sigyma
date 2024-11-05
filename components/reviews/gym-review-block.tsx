import { ReviewStars } from "../review-stars";

interface ReviewItemProps {
  title: string;
  content: string;
  author: string;
  overallscore: string;
}

export const GymItemReview = ({
  title,
  content,
  author,
  overallscore,
}: ReviewItemProps) => {
  return (
    <div className="flex w-full bg-gray-100 shadow justify-between">
      <div className=" rounded-lg p-4  h-32 flex flex-col justify-between">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{content}</p>
        <span className="text-xs text-gray-500">{author}</span>
      </div>
      <div className="flex flex-col gap-y-2 justify-center items-center  p-4">
        <ReviewStars
          overallscore={overallscore}
          size={1.25}
          color="text-prim"
        />
        <div className="flex gap-1 items-center">
          <span className="font-bold text-prim">{overallscore}</span>
          <span className="text-sm text-muted-foreground">
            out of 142 scores
          </span>
        </div>
      </div>
    </div>
  );
};
