"use client";
import { useGetMarkers } from "@/features/accounts/api/markers/use-get-markers";
import { ScrollArea } from "../ui/scroll-area";
import { GymItem } from "./gym-item";
import { Loader2 } from "lucide-react";

interface GymListProp {
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
}

export const GymList = ({ mapRef }: GymListProp) => {
  const markers = useGetMarkers();

  if (markers.isPending) {
    return (
      <div className="flex sm:min-w-[310px] w-full sm:w-1/4 h-full flex-col border-r-4">
        <div className="font-semibold tracking-widest text-white py-6 prim flex justify-center items-center bg-white">
          GYM LIST
        </div>
        <div className="m-2 flex bg-slate-100 rounded-xl justify-center items-center h-[600px]">
          <Loader2 className="animate-spin text-prim" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full sm:w-1/4 sm:min-w-[310px]  sm:h-full flex-col border-r-4">
      <div className="font-semibold tracking-widest text-white py-6 prim flex justify-center items-center bg-white">
        GYM LIST
      </div>
      <div className="m-2 flex bg-slate-100 rounded-xl h-[165px] sm:h-[600px]">
        {markers.data?.length === 0 ? (
          <div className="text-prim self-center mx-auto">
            No gym has been listed yet!
          </div>
        ) : (
          <ScrollArea className="w-full">
            <div className="space-y-2 m-2">
              {markers.data?.map((marker) => {
                return (
                  <GymItem
                    mapRef={mapRef}
                    key={marker.id}
                    lat={marker.lat}
                    lng={marker.lng}
                    gymName={marker.gymName}
                    id={marker.id}
                    gymCity={marker.gymCity}
                    gymAdress={marker.gymAdress}
                  />
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
