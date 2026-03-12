import Link from "next/link";

export default function CTA() {
  return (
    <>
      <section className="max-w-5xl py-16 md:w-full mx-2 md:mx-auto flex flex-col items-center justify-center text-center bg-gradient-to-b from-primary to-black/90 rounded-2xl p-8 text-white shadow-2xl mt-12 mb-8">
        <p className="px-6 py-2 rounded-full text-sm border border-white/20 bg-white/10 text-white backdrop-blur-sm">
          Get Professional Legal Support
        </p>
        <h1 className="text-2xl md:text-4xl md:leading-[50px] font-medium max-w-2xl mt-5 text-white">
          Join over 1000+ clients{" "}
          <span className="text-gray-300">
            who have trusted our legal expertise
          </span>
        </h1>
        <p className="text-gray-300 text-sm mt-4 max-w-lg">
          Schedule a consultation today and experience the difference of working
          with a dedicated legal team.
        </p>
        <Link
          href="/contact"
          className="cursor-pointer px-12 py-3 mt-8 rounded-full text-sm font-semibold bg-white text-primary hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
        >
          Book a Consultation
        </Link>
      </section>
    </>
  );
}
