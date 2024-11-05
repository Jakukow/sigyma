import { ReviewItem } from "@/components/reviews/gym-review-block";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReviewsPage = () => {
  const reviews = [
    {
      title: "Great Gym",
      content: "Loved the equipment and trainers!",
      author: "Alice",
    },
    {
      title: "Amazing Atmosphere",
      content: "Perfect vibe for working out.",
      author: "Bob",
    },
    {
      title: "Well-equipped",
      content: "Had everything I needed for my workout.",
      author: "Charlie",
    },
    {
      title: "Well-equipped",
      content: "Had everything I needed for my workout.",
      author: "Charlie",
    },
    {
      title: "Well-equipped",
      content: "Had everything I needed for my workout.",
      author: "Charlie",
    },
    {
      title: "Well-equipped",
      content: "Had everything I needed for my workout.",
      author: "Charlie",
    },
    {
      title: "Well-equipped",
      content: "Had everything I needed for my workout.",
      author: "Charlie",
    },
    {
      title: "Well-equipped",
      content: "Had everything I needed for my workout.",
      author: "Charlie",
    },
    {
      title: "Well-equipped",
      content: "Had everything I needed for my workout.",
      author: "Charlie",
    },
  ];

  return (
    <div className="mt-11 mx-5 items-center flex flex-col w-full h-full shadow bg-white rounded-xl overflow-hidden">
      <div className="bg-slate-400 py-5 prim flex w-full text-white uppercase justify-center tracking-widest font-semibold">
        CHOOSE YOUR BEST GYM!
      </div>
      <div className="bg-white w-full flex h-full">
        <ScrollArea className="m-4 h-[600px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <ReviewItem key={index} author={review.author} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ReviewsPage;
