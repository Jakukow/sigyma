interface GymItemProps {
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
}
export const GymItem = ({ mapRef }: GymItemProps) => {
  return (
    <div
      className="gap-x-5 justify-center items-center flex bg-white shadow py-4 rounded-xl hover:cursor-pointer"
      onClick={() => {
        mapRef.current?.flyTo({
          center: [19.945, 50.064], // Współrzędne docelowe (np. Kraków)
          zoom: 14, // Opcjonalne: ustawienie zoomu
          speed: 1.5, // Opcjonalne: kontrola szybkości animacji
        });
      }}
    >
      <span className="ml-2 text-center font-medium tracking-wide">
        GYM NAME
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
