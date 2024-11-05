import { ScrollArea } from "@/components/ui/scroll-area";

const ReviewsPage = () => {
  return (
    <div className="mt-11 mx-5 items-center  flex flex-col w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <div className="bg-slate-400 py-5 prim flex w-full text-white uppercase justify-center tracking-widest font-semibold">
        CHOOSE YOUR BEST GYM!
      </div>
      <div className="bg-white w-full flex  h-full">
        <ScrollArea className="m-2 w-full">
          <div className="h-[600px] bg-slate-100 grid grid-cols-2 gap-2 w-full rounded-xl">
            <div className="bg-indigo-400 h-full  ">gaga</div>
            <div className="bg-indigo-400 h-full ">gaga</div>
            <div className="bg-indigo-400 h-1/2  ">gaga</div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ReviewsPage;
