import { Edit, Eye, X } from "lucide-react";

interface TrainingSingleProps {
  training: string;
}

export const TrainingSingle = ({ training }: TrainingSingleProps) => {
  return (
    <div className="px-2 my-3 w-full">
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
          <button>
            <X className="prim text-white text-xs rounded-md hover:-translate-y-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
