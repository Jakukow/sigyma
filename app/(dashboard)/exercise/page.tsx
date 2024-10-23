import { ExerciseNavbar } from "@/components/exercise/navbar/exercise-navbar";

const ExercisePage = () => {
  return (
    <div className="mt-11  mr-11 flex flex-col w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <ExerciseNavbar />
      <div className=" flex h-full w-full items-center ">
        <div className="flex h-[95%] w-full mx-4  bg-slate-100 rounded-xl "></div>
      </div>
    </div>
  );
};

export default ExercisePage;
