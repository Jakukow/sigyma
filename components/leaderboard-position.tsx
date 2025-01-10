import { useUser } from "@clerk/nextjs";

interface LeaderboardPositionProps {
  leaderboard: {
    id: number;
    clerkId: string;
    exerciseId: number;
    weight: number;
    reps: number | null;
    bestWeight: number;
    achievedAt: string;
  }[];
}

export const LeaderboardPosition = ({
  leaderboard,
}: LeaderboardPositionProps) => {
  const user = useUser();

  if (leaderboard.length === 0) {
    <div className="flex flex-col gap-y-3 justify-start h-full">
      <span className="text-white font-semibold">No results yet</span>
    </div>;
  }

  return (
    <div className="flex flex-col gap-y-3 justify-start h-full">
      {leaderboard.map((position, index) => {
        if (index > 4) {
          if (position.clerkId === user.user?.id) {
            return (
              <div key={position.id}>
                <div
                  className={`flex flex-row gap-x-5 ${
                    user.user?.id === position.clerkId && "animate-pulse"
                  }`}
                >
                  <div className="bg-white rounded-full size-7 flex justify-center items-center text-prim font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-white w-48">
                    {position.clerkId.slice(0, 20)}
                  </span>
                  <span className="text-white">
                    {position.weight}
                    {!position.reps ? " s" : " kg"}{" "}
                  </span>
                </div>
                <hr className="mt-4" />
              </div>
            );
          } else {
            return null;
          }
        }
        return (
          <div key={position.id}>
            <div
              className={`flex flex-row gap-x-5 ${
                user.user?.id === position.clerkId && "animate-pulse"
              }`}
            >
              <div className="bg-white rounded-full size-7 flex justify-center items-center text-prim font-semibold">
                {index + 1}
              </div>
              <span className="text-white w-48">
                {position.clerkId.slice(0, 20)}
              </span>
              <span className="text-white">
                {position.weight}
                {!position.reps ? " s" : " kg"}{" "}
              </span>
            </div>
            <hr className="mt-4" />
          </div>
        );
      })}
    </div>
  );
};
