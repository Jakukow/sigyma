interface ReviewBarProps {
  label: string;
  value: number;
}

import { Progress } from "../ui/progress";

export const ReviewBar = ({ label, value }: ReviewBarProps) => {
  return (
    <div className="flex justify-end items-center gap-6">
      <span className="tracking-wider font-light">{label}:</span>
      <div className="flex  items-center  gap-3">
        <Progress className="w-36" value={value * 20} />
        <span className="min-w-[20px] text-center">{value}</span>
      </div>
    </div>
  );
};
