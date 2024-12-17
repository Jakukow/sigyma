"use client";
import { TrainingCard } from "@/components/plans/training-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetPlans } from "@/features/accounts/api/planlist/use-get-plans";
import { transformPlanListToTrainingDays } from "@/lib/utils";

import { Loader2 } from "lucide-react";

const PlansPage = () => {
  const planList = useGetPlans();
  const trainingsList = planList
    ? transformPlanListToTrainingDays(planList.data || [])
    : [];

  return (
    <div className="mt-11  flex justify-center items-center w-full   ">
      {planList.isLoading ? (
        <Loader2 className="animate-spin text-prim" />
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className=" w-full max-w-sm md:max-w-3xl lg:max-w-5xl"
        >
          <CarouselContent>
            {trainingsList.map((day, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
                <TrainingCard day={day.day} training={day.trainings || []} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default PlansPage;
