interface GymItemProps {
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
  lat: string;
  lng: string;
  gymName: string;
  gymAdress: string;
  gymCity: string;

  id: number;
}
export const GymItem = ({
  mapRef,
  lat,
  lng,
  gymName,
  gymCity,
  gymAdress,
}: GymItemProps) => {
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
          {gymCity}
        </span>
        <span className=" text-xs text-center text-muted-foreground font-light">
          {gymAdress}
        </span>
      </div>
    </div>
  );
};
