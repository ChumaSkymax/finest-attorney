import {
  ArrowRightIcon,
  PlayIcon,
  ZapIcon,
  CheckIcon,
  GraduationCapIcon,
  AwardIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import BookConsultationButton from "./BookConsultationButton";
import HeroCard from "./HeroCard";

export default function Hero() {
  const trustedUserImages = [
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
  ];

  const mainImageUrl = "/images/FinestBanner.jpeg";

  const galleryStripImages = [
    "/images/finest-banner.jpg",
    "/images/finest-banner2.jpg",
    "/images/finest-banner3.jpg",
  ];

  return (
    <>
      <section
        id="home"
        className="relative z-10 w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://amicable-spaniel-706.eu-west-1.convex.cloud/api/storage/29664e23-fc8d-452e-8861-c0ce69706f98')",
        }}
      >
        {/* Dark overlay so text stays readable on any background image */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-10 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="text-center w-full max-w-3xl mx-auto">
              {/* Badge
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 pl-3 pr-3 py-1.5
                  rounded-full bg-primary/90 shadow-lg mb-6 justify-center
                  max-w-[90vw] flex-wrap"
              >
                <span className="text-xs text-white leading-snug">
                  We are trusted legal advisors to businesses across various
                  sectors.
                </span>
                <div className="shrink-0 flex items-center rounded-full bg-white px-2 py-1.5">
                  <ArrowRightIcon className="size-3.5 text-primary" />
                </div>
              </Link> */}
              {/* Heading */}
              <h1 className="text-2xl font-playfair-display sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 mt-10 text-white mx-auto ">
                We are a full service law firm{" "}
                <span className="text-white/90">
                  based in Dar es Salaam, Tanzania
                </span>
              </h1>
              {/* Subtext */}
              <p className="text-sm sm:text-base text-white max-w-xl mx-auto mb-8 px-2 sm:px-0 leading-relaxed">
                Providing strategic, reliable and results driven legal services
                to both local and international clients. Established in 2014,
                the firm has built a strong reputation for excellence in
                corporate, commercial and litigation practice.
              </p>
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 w-full">
                <Link href="/practise-areas" className="w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-auto py-5 px-6 rounded-full text-sm
                      cursor-pointer bg-white border border-primary
                      text-primary hover:bg-primary hover:text-primary transition-colors"
                  >
                    <AwardIcon className="size-4" />
                    10+ Years of experience
                  </Button>
                </Link>

                <div className="w-full sm:w-auto">
                  <BookConsultationButton />
                </div>
              </div>
            </div>

            {/* Hero cards carousel */}
            <div className="w-full">
              <HeroCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
