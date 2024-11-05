interface ReveiwCircleProps {
  number: number;
  label: string;
}

export const ReviewCircle = ({ number, label }: ReveiwCircleProps) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="prim aspect-square size-6 p-5 rounded-full  flex items-center justify-center text-white font-medium">
        {number}
      </div>
      <span className="text-sm tracking-wider text-slate-500">{label}</span>
    </div>
  );
};
