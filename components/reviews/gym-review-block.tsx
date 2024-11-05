interface ReviewItemProps {
  title: string;
  content: string;
  author: string;
}

export const ReviewItem = ({ title, content, author }: ReviewItemProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow h-32 flex flex-col justify-between">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
      <span className="text-xs text-gray-500">{author}</span>
    </div>
  );
};
