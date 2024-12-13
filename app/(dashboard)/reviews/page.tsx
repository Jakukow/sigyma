"use client";
import { GymItemReview } from "@/components/reviews/gym-review-block";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetMarkers } from "@/features/accounts/api/markers/use-get-markers";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

const ReviewsPage = () => {
  const [open, setOpen] = useState(false);
  const markers = useGetMarkers();
  const router = useRouter();
  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          disabled={markers.isLoading}
          placeholder="Search your gym..."
        />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Results">
            {markers.data?.map((reviews) => {
              return (
                <CommandItem
                  className="cursor-pointer"
                  key={reviews.id}
                  onClickCapture={() => {
                    router.push(`/reviews/${reviews.id}`);
                  }}
                >
                  {reviews.gymName}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <div className="mt-11 mx-5 items-center flex flex-col w-full h-full shadow bg-white rounded-xl overflow-hidden">
        <div className="bg-slate-400 py-5 relative prim flex w-full items-center   justify-center">
          <span className="text-white uppercase md:flex hidden tracking-widest font-semibold absolute left-5">
            FIND YOUR BEST PLACE TO WORKOUT
          </span>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="p-1 bg-[#8c7dcc] mx-4 flex justify-between w-full rounded-xl md:w-1/3  hover:-translate-y-1 transition-all"
          >
            <span className="ml-3 text-white font-light">Search...</span>
            <Search className="mr-3 text-white" />
          </button>
        </div>

        <div className="bg-white w-full flex h-full">
          {markers.isLoading ? (
            <Loader2 className="animate-spin text-prim self-center mx-auto" />
          ) : !!markers.data ? (
            <ScrollArea className="m-4 h-[600px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {markers.data.map((review) => (
                  <GymItemReview
                    key={review.id}
                    id={review.id}
                    gymName={review.gymName}
                    gymAdress={review.gymAdress}
                    gymCity={review.gymCity}
                    scores={review.scores ?? []}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            "No content"
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
