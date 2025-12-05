interface SinglePositionProps {
  name: string;
  unit: string;
  score: number | string;
  position: number;
}

export const SinglePosition = ({
  name,
  unit,
  score,
  position,
}: SinglePositionProps) => {
  return (
    <div className="font-bold text-sm  xs:text-md text-muted-foreground rounded-xl justify-between  flex bg-white shadow p-4">
      <span>{position} #</span>
      <span>{name}</span>
      <span>
        {score} {unit}
      </span>
    </div>
  );
};
