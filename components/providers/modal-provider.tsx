"use client";

import { useState, useEffect } from "react";
import { CreateExerciseModal } from "../modals/create-exercise-modal";
import { CreateTrainingModal } from "../modals/create-training-modal";
import { CreateMarkerModal } from "../modals/create-gym-marker";
import { ShowMarkerModal } from "../modals/show-gym-marker";
import { WriteReviewModal } from "../modals/write-review-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateTrainingModal />
      <CreateExerciseModal />
      <ShowMarkerModal />
      <CreateMarkerModal />
      <WriteReviewModal />
    </>
  );
}
