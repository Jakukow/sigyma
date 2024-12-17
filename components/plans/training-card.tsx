"use client";
import { useModal } from "@/hooks/use-modal-store";
import { TrainingSingle } from "./training-single";

interface TrainingCardProps {
  day: string;
  training: {
    id: number;
    clerkId: string;
    planName: string;
  }[];
}

export const TrainingCard = ({ day, training }: TrainingCardProps) => {
  const { onOpen } = useModal();

  return (
    <div className="p-1 ">
      <div>
        <div className="flex min-h-[50vh] max-h-[80vh] flex-col items-center justify-between overflow-hidden bg-white shadow rounded-xl ">
          <div className="prim py-2 w-full justify-center flex text-white">
            <span className="text-xl font-light">{day}</span>
          </div>

          <div className="flex w-full  h-full  ">
            <div className="m-4  w-full h-[45vh] no-scrollbar flex flex-col justify-start overflow-y-auto  items-center rounded-xl bg-slate-200 ">
              {training.some((training) => training) ? (
                training.map((training, index) => (
                  <TrainingSingle
                    key={index}
                    training={training.planName}
                    id={training.id}
                    clerkId={training.clerkId}
                  />
                ))
              ) : (
                <div className="w-full h-full gap-y-5 bg-white flex-col justify-center font-bold text-3xl tracking-widest text-prim items-center  flex">
                  <span>Rest Day</span>
                </div>
              )}
            </div>
          </div>

          <div className="prim py-2 w-full justify-center flex text-white mt-2">
            <button
              onClick={() => {
                onOpen("createTraining", { description: day });
              }}
              className="text-xl font-light hover:opacity-50 transition-all flex-shrink-0"
            >
              New Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
