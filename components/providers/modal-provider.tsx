"use client";

import { useState, useEffect } from "react";
import { CreateExerciseModal } from "../modals/create-exercise-modal";

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
      <CreateExerciseModal />
    </>
  );
}
