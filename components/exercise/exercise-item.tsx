import { cn } from "@/lib/utils";
import { Edit, X } from "lucide-react";

interface ExerciseItemProps {
  name: string;
  description: string;
  unit: string;
  defaultEx: boolean;
}

export const ExerciseItem = ({
  name,
  description,
  unit,
  defaultEx,
}: ExerciseItemProps) => {
  return (
    <div className=" justify-between mx-2 items-center py-4 my-2 gap-x-5 rounded-xl flex bg-white shadow">
      <div className="flex items-center">
        <span className=" ml-5 font-semibold tracking-widest text-muted-foreground ">
          {name.toUpperCase()}
        </span>
        <span className="text-xs text-muted-foreground"> /{unit}</span>
      </div>

      <p className="text-sm  ">{description}</p>
      <div
        className={cn(
          "flex items-center mr-4 gap-x-2",
          defaultEx ? "visibility-hidden pointer-events-none" : ""
        )}
      >
        <button>
          <Edit className="text-prim hover:-translate-y-1 transition-all" />
        </button>
        <button>
          <X className="prim text-white text-xs rounded-md hover:-translate-y-1 transition-all" />
        </button>
      </div>
    </div>
  );
};
