import { TrainingCard } from "@/components/plans/training-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { trainingsList } from "@/lib/constants";

const PlansPage = () => {
  return (
    <div className="mt-11  flex justify-center items-center w-full   ">
      <Carousel
        opts={{
          align: "start",
        }}
        className=" w-full max-w-sm md:max-w-3xl lg:max-w-5xl"
      >
        <CarouselContent>
          {trainingsList.map((day, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
              <TrainingCard day={day.day} training={day.trainings} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PlansPage;
