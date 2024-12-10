interface GymItemProps {
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
  lat: string;
  lng: string;
  gymName: string;
  id: number;
}
export const GymItem = ({ mapRef, lat, lng, gymName }: GymItemProps) => {
  return (
    <div
      className="gap-x-5 justify-center items-center flex bg-white shadow py-4 rounded-xl hover:cursor-pointer"
      onClick={() => {
        mapRef.current?.flyTo({
          center: [+lng, +lat],
          zoom: 14,
          speed: 1.5,
        });
      }}
    >
      <span className="ml-2 text-center font-medium tracking-wide">
        {gymName}
      </span>
      <div className="flex flex-col mr-2">
        <span className=" text-center text-muted-foreground font-light">
          Warsaw
        </span>
        <span className=" text-xs text-center text-muted-foreground font-light">
          Wolska 12
        </span>
      </div>
    </div>
  );
};
