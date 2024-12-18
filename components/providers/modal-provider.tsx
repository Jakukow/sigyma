"use client";

import { useState, useEffect } from "react";
import { CreateExerciseModal } from "../modals/create-exercise-modal";
import { CreateTrainingModal } from "../modals/create-training-modal";
import { CreateMarkerModal } from "../modals/create-gym-marker";
import { ShowMarkerModal } from "../modals/show-gym-marker";
import { WriteReviewModal } from "../modals/write-review-modal";
import { CreateGoalModal } from "../modals/create-goal-modal";
import { EditExerciseModal } from "../modals/edit-exercise-modal";
import { ShowPlanExercisesModal } from "../modals/show-plan-exercises";
import { EditTrainingModal } from "../modals/edit-training-modal";

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
      <EditTrainingModal />
      <ShowPlanExercisesModal />
      <CreateTrainingModal />
      <CreateExerciseModal />
      <ShowMarkerModal />
      <CreateMarkerModal />
      <WriteReviewModal />
      <CreateGoalModal />
      <EditExerciseModal />
    </>
  );
}
