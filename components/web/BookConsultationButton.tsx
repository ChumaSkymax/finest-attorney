"use client";

import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function BookConsultationButton() {
  const { openModal } = useConsultationModal();
  return (
    <button
      onClick={openModal}
      className="bg-primary hover:bg-primary/80 transition rounded-full px-4 py-2 text-white cursor-pointer text-sm"
    >
      Book Consultation
    </button>
  );
}
