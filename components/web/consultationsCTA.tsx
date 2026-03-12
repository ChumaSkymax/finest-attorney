import BookConsultationButton from "./BookConsultationButton";

export default function ConsultationsCTA() {
  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center gap-4 bg-primary/10 p-6 rounded-lg">
      <h2 className="text-lg font-semibold text-primary">
        Need a Consultation?
      </h2>
      <p className="text-xs text-center">
        If you need legal advice or representation, we are here to help. <br />
        Book a consultation today.
      </p>
      <BookConsultationButton />
    </div>
  );
}
