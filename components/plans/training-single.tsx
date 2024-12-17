import { useDeletePlan } from "@/features/accounts/api/planlist/use-delete-plan";
import { cn } from "@/lib/utils";
import { Edit, Eye, X } from "lucide-react";
import { useState } from "react";

interface TrainingSingleProps {
  training: string;
  id: number;
  clerkId: string;
}

export const TrainingSingle = ({ training, id }: TrainingSingleProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePlans = useDeletePlan();

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deletePlans.mutate(
        {
          id,
        },
        {
          onSuccess: () => {},
        }
      );
    }, 500);
  };

  const handleView = () => {};
  const handleEdit = () => {};

  return (
    <div
      className={cn(
        `px-2 my-3 w-full`,
        isDeleting ? "opacity-0 scale-95 transition-all duration-500" : ""
      )}
    >
      <div className="px-3 justify-between w-full py-4 items-center hover:opacity-90 transition-all gap-x-5 rounded-xl shadow flex bg-white">
        <span className="ml-2 font-semibold tracking-widest text-muted-foreground">
          {training}
        </span>
        <div className="flex items-center mr-2g gap-x-2">
          <button>
            <Eye className="text-prim hover:-translate-y-1 transition-all" />
          </button>
          <button>
            <Edit className="text-prim hover:-translate-y-1 transition-all" />
          </button>
          <button onClick={handleDelete}>
            <X className="prim text-white text-xs rounded-md hover:-translate-y-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
