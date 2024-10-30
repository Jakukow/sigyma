import { TrainingSingle } from "./training-single";

interface TrainingCardProps {
  day: string;
  training: string[];
}

export const TrainingCard = ({ day, training }: TrainingCardProps) => {
  return (
    <div className="p-1 hover:scale-95 overflow-visible transition-all ">
      <div>
        <div className="flex h-[60vh] flex-col  items-center justify-between overflow-hidden  bg-white shadow rounded-xl ">
          <div className="prim py-2 w-full justify-center flex text-white">
            <span className="text-xl font-light">{day}</span>
          </div>

          <div className="flex w-full  h-full ">
            <div className="m-4 w-full  flex flex-col justify-center items-center rounded-xl bg-slate-100">
              {training.some((training) => training) ? (
                training.map((training, index) => (
                  <TrainingSingle key={index} training={training} />
                ))
              ) : (
                <div className="w-full h-full gap-y-5 bg-white flex-col justify-center font-bold text-3xl tracking-widest text-prim items-center  flex">
                  <span>Rest Day</span>
                </div>
              )}
            </div>
          </div>

          <div className="prim py-2 w-full justify-center flex text-white">
            <button className="text-xl font-light hover:opacity-50 transition-all">
              New Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
