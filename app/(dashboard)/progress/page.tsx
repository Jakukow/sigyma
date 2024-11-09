"use client";

import { useState } from "react";

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-11 mx-5 items-center justify-center flex w-full h-full max-h-[750px] shadow bg-white rounded-xl overflow-hidden">
      <div className="hidden md:w-1/3 h-full text-white font-bold md:flex prim">
        <div className="flex flex-col m-10 items-center gap-y-6">
          <h1 className="text-3xl text-center tracking-wider">
            CHOOSE TRAINING OR SINGLE EXERCISE
          </h1>
          <div className="relative flex w-2/3 justify-center">
            <button
              onClick={() => setActiveTab(0)}
              className={`p-2 w-1/2 text-center z-10 border-2 border-r-0  rounded-l-xl ${
                activeTab === 0 ? "text-prim" : "text-white"
              }`}
            >
              Training
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`p-2 w-1/2 text-center z-10 border-2 border-l-0  rounded-r-xl ${
                activeTab === 1 ? "text-prim" : "text-white"
              }`}
            >
              Exercise
            </button>

            <span
              className={`absolute h-full w-1/2 top-0 left-0   bg-white transition-all duration-500 
                ${activeTab === 0 ? "rounded-l-xl" : "rounded-r-xl"}`}
              style={{
                transform: `translateX(${activeTab * 100}%)`,
              }}
            />
          </div>
          <div className=" bg-black/10 flex w-full h-[32rem] mt-2 rounded-xl no-scrollbar1 overflow-y-auto">
            <div className="m-4 flex flex-col w-full gap-y-4 ">
              <div className="flex bg-white rounded-xl justify-center text-prim py-4">
                <span>Deadlift</span>
              </div>
            </div>
          </div>
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
