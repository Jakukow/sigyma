interface SinglePositionProps {
  name: string;
  unit: "kg" | "s" | "reps";
  score: number;
  position: number;
}

export const SinglePosition = ({
  name,
  unit,
  score,
  position,
}: SinglePositionProps) => {
  return (
    <div className="font-bold text-muted-foreground rounded-xl justify-between  flex bg-white shadow p-4">
      <span>{position} #</span>
      <span>{name}</span>
      <span>
        {score}
        {unit}
      </span>
    </div>
  );
};