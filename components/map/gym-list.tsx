import { ScrollArea } from "../ui/scroll-area";
import { GymItem } from "./gym-item";

interface GymListProp {
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
}

export const GymList = ({ mapRef }: GymListProp) => {
  return (
    <div className="flex w-1/4 h-full flex-col border-r-4">
      <div className="font-semibold tracking-widest text-white py-6 prim flex justify-center items-center bg-white">
        GYM LIST
      </div>
      <div className="m-2 flex bg-slate-100 rounded-xl h-[600px]">
        <ScrollArea className="w-full">
          <div className="space-y-2 m-2">
            <GymItem mapRef={mapRef} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
