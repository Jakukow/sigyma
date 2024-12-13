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
import { useEffect, useState } from "react";

const Review = () => {
  const params = useParams();
  const [scores, setSocres] = useState({
    comfortScore: 0,
    cleanlinessScore: 0,
    eqScore: 0,
    atmScore: 0,
  });
  const reviews = useGetReviews(+params.id);

  useEffect(() => {
    getReviewsSummary();
  }, [reviews.data]);
  const getReviewsSummary = () => {
    if (!reviews.data) return;
    const comfortScore =
      reviews.data?.reduce((red, acc) => red + acc.comfort, 0) /
      reviews.data?.length;
    const cleanlinessScore =
      reviews.data?.reduce((red, acc) => red + acc.cleanliness, 0) /
      reviews.data?.length;
    const eqScore =
      reviews.data?.reduce((red, acc) => red + acc.equipment, 0) /
      reviews.data?.length;
    const atmScore =
      reviews.data?.reduce((red, acc) => red + acc.atmosphere, 0) /
      reviews.data?.length;
    setSocres({
      comfortScore,
      cleanlinessScore,
      eqScore,
      atmScore,
    });
  };

  const { onOpen } = useModal();
  return (
    <div className="mt-11 mx-5 items-center flex  w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <div className="w-1/3 justify-center items-center flex flex-col gap-6 prim h-full  text-white">
        {reviews.isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <div className="flex flex-col items-center gap-3">
              <h1 className=" font-semibold text-6xl">4,2</h1>
              <ReviewStars overallscore="" size={1.25} color="text-white" />
              <span className=" tracking-widest text-sm">
                Reviews:{" "}
                <span className="font-semibold">{reviews.data?.length}</span>
              </span>
            </div>
            <Separator className="w-1/2" />
            <div className="flex  flex-col  gap-2 ">
              <ReviewBar
                label="Comfort"
                value={+scores.comfortScore.toFixed(0)}
              />
              <ReviewBar label="Cleanliness" value={scores.cleanlinessScore} />
              <ReviewBar label="Equipment" value={scores.eqScore} />
              <ReviewBar label="Atmosphere" value={scores.atmScore} />
            </div>
            <Separator className="w-1/2" />
            <div className="flex flex-col items-center">
              <span className=" font-semibold text-2xl tracking-widest">
                Altis
              </span>
              <span className="font-light">Tarnowskie Góry</span>
            </div>

            <Button
              className=" bg-white    mt-2 text-prim hover:bg-slate-100 w-1/2"
              onClick={() => onOpen("writeReview", params)}
            >
              Write Review
            </Button>
          </>
        )}
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
