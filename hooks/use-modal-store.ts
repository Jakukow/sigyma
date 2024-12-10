import { LngLat } from "maplibre-gl";
import { create } from "zustand";

export type ModalType =
  | "createExercise"
  | "createTraining"
  | "createMarker"
  | "showMarker"
  | "writeReview"
  | "createGoal";

interface ModalData {
  name?: string;
  address?: string;
  description?: string;
  clerkId?: string;
  lngLat?: LngLat;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
