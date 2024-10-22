import CircularProgress from "../circ-progress";

export const Goal = () => {
  return (
    <div className="flex h-full p-11 flex-col w-1/3 shadow rounded-3xl items-center justify-between">
      <span className="font-semibold tracking-widest text-muted-foreground">
        MAIN EXERCISE GOAL
      </span>
      <CircularProgress value={110} maxValue={150} unit="kg" />
      <span className="font-semibold tracking-widest text-muted-foreground">
        5 REPS BENCH PRESS
      </span>
    </div>
  );
};
