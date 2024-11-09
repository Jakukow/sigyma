import { Select } from "@/components/ui/select";

const ProgressPage = () => {
  return (
    <div className="mt-11 mx-5 items-center justify-center flex w-full h-full max-h-[750px] shadow bg-white rounded-xl overflow-hidden">
      <div className="hidden md:w-1/3 h-full text-white font-bold md:flex prim">
        <div className="flex flex-col m-10 ">
          <h1 className="text-3xl text-center tracking-wider">
            CHOSE TRAINING OR SINGLE EXERCISE
          </h1>
        </div>
      </div>
      <div className="w-full md:w-2/3 h-full flex flex-col bg-white">
        <div className="flex m-4 h-full">
          <div className="bg-slate-200 rounded-xl w-full p-4 overflow-y-scroll no-scrollbar h-[720px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
