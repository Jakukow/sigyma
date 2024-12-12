"use client";
import { ReviewStars } from "@/components/review-stars";
import { ReviewBar } from "@/components/reviews/review-bar";
import { SingleReview } from "@/components/reviews/single-review";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";
import { useGetReviews } from "@/features/accounts/api/reviews/use-get-reviews";
import { useModal } from "@/hooks/use-modal-store";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

const Review = () => {
  const params = useParams();

  const reviews = useGetReviews(+params.id);

  const { onOpen } = useModal();
  return (
    <div className="mt-11 mx-5 items-center flex  w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <div className="w-1/3 justify-center items-center flex flex-col gap-6 prim h-full  text-white">
        <div className="flex flex-col items-center gap-3">
          <h1 className=" font-semibold text-6xl">4,2</h1>
          <ReviewStars overallscore="4.2" size={1.25} color="text-white" />
          <span className=" tracking-widest text-sm">
            Reviews: <span className="font-semibold">454</span>
          </span>
        </div>
        <Separator className="w-1/2" />
        <div className="flex  flex-col  gap-2 ">
          <ReviewBar label="Comfort" value={1} />
          <ReviewBar label="Cleanliness" value={2} />
          <ReviewBar label="Equipment" value={3} />
          <ReviewBar label="Atmosphere" value={4} />
        </div>
        <Separator className="w-1/2" />
        <div className="flex flex-col items-center">
          <span className=" font-semibold text-2xl tracking-widest">Altis</span>
          <span className="font-light">Tarnowskie Góry</span>
        </div>

        <Button
          className=" bg-white    mt-2 text-prim hover:bg-slate-100 w-1/2"
          onClick={() => onOpen("writeReview", params)}
        >
          Write Review
        </Button>
      </div>
      <div className="w-2/3 flex flex-col justify-center h-full">
        <div className="m-4 rounded-xl flex h-[650px] bg-slate-200">
          <div className=" m-4 flex w-full">
            {reviews.isLoading ? (
              <Loader2 className="animate-spin text-prim mx-auto self-center" />
            ) : (
              <>
                {" "}
                <ScrollArea className="w-full">
                  <div className="flex flex-col gap-y-2">
                    {reviews.data?.length === 0 ? (
                      <p className="text-prim mx-auto ">
                        No reviews has been posted yet
                      </p>
                    ) : (
                      reviews.data?.map((review) => {
                        return (
                          <SingleReview
                            key={review.id}
                            title={review.title}
                            comfort={review.comfort}
                            cleanliness={review.cleanliness}
                            equipment={review.equipment}
                            atmosphere={review.atmosphere}
                            body={review.body}
                            createdAt={review.createdAt}
                            overall={review.overall}
                            username={review.clerkName}
                          />
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
