"use client";
import { ReviewStars } from "@/components/review-stars";
import { ReviewBar } from "@/components/reviews/review-bar";
import { SingleReview } from "@/components/reviews/single-review";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";
import { useGetMarkers } from "@/features/accounts/api/markers/use-get-markers";
import { useGetReviews } from "@/features/accounts/api/reviews/use-get-reviews";
import { useModal } from "@/hooks/use-modal-store";
import { avg } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Review = () => {
  const params = useParams();
  const [scores, setScores] = useState({
    comfortScore: 0,
    cleanlinessScore: 0,
    eqScore: 0,
    atmScore: 0,
  });
  const reviews = useGetReviews(+params.id);
  const marker = useGetMarkers(+params.id);

  useEffect(() => {
    if (reviews.data) {
      getReviewsSummary();
    }
  }, [reviews.data]);

  const getReviewsSummary = () => {
    if (!reviews.data) return;
    const comfortScore =
      reviews.data.reduce((red, acc) => red + acc.comfort, 0) /
      reviews.data.length;
    const cleanlinessScore =
      reviews.data.reduce((red, acc) => red + acc.cleanliness, 0) /
      reviews.data.length;
    const eqScore =
      reviews.data.reduce((red, acc) => red + acc.equipment, 0) /
      reviews.data.length;
    const atmScore =
      reviews.data.reduce((red, acc) => red + acc.atmosphere, 0) /
      reviews.data.length;
    setScores({
      comfortScore,
      cleanlinessScore,
      eqScore,
      atmScore,
    });
  };

  const { onOpen } = useModal();

  return (
    <div className="mt-11 mx-5 items-center flex w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <div className="w-1/3 justify-center items-center flex flex-col gap-6 prim h-full text-white">
        {reviews.isLoading || marker.isLoading ? (
          <Loader2 className="animate-spin" />
        ) : marker.data && marker.data.length > 0 ? ( // Sprawdzenie czy dane są dostępne
          <>
            <div className="flex flex-col items-center gap-3">
              <h1 className="font-semibold text-6xl">
                {avg(marker.data[0].scores).toFixed(2)}
              </h1>
              <ReviewStars
                overallscore={avg(marker.data[0].scores).toString()}
                size={1.25}
                color="text-white"
              />
              <span className="tracking-widest text-sm">
                Reviews:{" "}
                <span className="font-semibold">{reviews.data?.length}</span>
              </span>
            </div>
            <Separator className="w-1/2" />
            <div className="flex flex-col gap-2">
              <ReviewBar
                label="Comfort"
                value={+scores.comfortScore.toFixed(1)}
              />
              <ReviewBar
                label="Cleanliness"
                value={+scores.cleanlinessScore.toFixed(1)}
              />
              <ReviewBar label="Equipment" value={+scores.eqScore.toFixed(1)} />
              <ReviewBar
                label="Atmosphere"
                value={+scores.atmScore.toFixed(1)}
              />
            </div>
            <Separator className="w-1/2" />
            <div className="flex flex-col items-center">
              <span className="font-semibold text-2xl tracking-widest">
                {marker.data[0].gymName}
              </span>
              <span className="font-light">{marker.data[0].gymCity}</span>
            </div>

            <Button
              className="bg-white mt-2 text-prim hover:bg-slate-100 w-1/2"
              onClick={() => onOpen("writeReview", params)}
            >
              Write Review
            </Button>
          </>
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
      <div className="w-2/3 flex flex-col justify-center h-full">
        <div className="m-4 rounded-xl flex h-[650px] bg-slate-200">
          <div className="m-4 flex w-full">
            {reviews.isLoading ? (
              <Loader2 className="animate-spin text-prim mx-auto self-center" />
            ) : (
              <ScrollArea className="w-full">
                <div className="flex flex-col gap-y-2">
                  {reviews.data?.length === 0 ? (
                    <p className="text-prim mx-auto">No reviews posted yet</p>
                  ) : (
                    reviews.data?.map((review) => (
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
                    ))
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
