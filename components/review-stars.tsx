import { cn } from "@/lib/utils";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface ReviewStarsProps {
  overallscore: string;
  size: number;
  color: string;
}

export const ReviewStars = ({
  overallscore,
  size,
  color,
}: ReviewStarsProps) => {
  const starsAmount = Math.floor(+overallscore);
  const hasHalfStar = +overallscore % 1 >= 0.3 && +overallscore % 1 < 0.8;
  const emptyStars = 5 - starsAmount - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-x-1">
      {Array.from({ length: starsAmount }).map((_, index) => {
        return <FaStar size={size + "rem"} className={cn(color)} key={index} />;
      })}
      {hasHalfStar && (
        <FaStarHalfAlt size={size + "rem"} className={cn(color)} />
      )}
      {Array.from({ length: emptyStars }).map((_, index) => {
        return (
          <FaRegStar size={size + "rem"} key={index} className={cn(color)} />
        );
      })}
    </div>
  );
};
