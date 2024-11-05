import { StarFilledIcon } from "@radix-ui/react-icons";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
  const starsAmount = Math.floor(+overallscore);
  const hasHalfStar = +overallscore % 1 >= 0.3 && +overallscore % 1 < 0.8;
  const emptyStars = 5 - starsAmount - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex w-full bg-gray-100 shadow justify-between">
      <div className=" rounded-lg p-4  h-32 flex flex-col justify-between">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{content}</p>
        <span className="text-xs text-gray-500">{author}</span>
      </div>
      <div className="flex flex-col gap-y-2 justify-center items-center  p-4">
        <div className="flex gap-x-1">
          {Array.from({ length: starsAmount }).map((_, index) => {
            return <FaStar className="text-prim size-5" key={index} />;
          })}
          {hasHalfStar && (
            <FaStarHalfAlt className="text-prim size-5 " fill="#a593f3" />
          )}
          {Array.from({ length: emptyStars }).map((_, index) => {
            return <FaRegStar key={index} className="text-prim size-5" />;
          })}
        </div>
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
