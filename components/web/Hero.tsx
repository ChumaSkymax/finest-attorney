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
      <section id="home" className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 min-h-screen max-md:w-screen max-md:overflow-hidden pt-32 md:pt-26 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 
                rounded-full bg-primary dark:bg-primary/60 
                 dark:text-foreground 
                shadow-lg shadow-md mb-6 justify-start"
              >
                <div className="flex -space-x-2"></div>
                <span className="text-xs text-white dark:text-gray-100">
                  We are trusted legal advisors to businesses across various
                  sectors.
                </span>
                <div className="flex items-center gap-1 rounded-full bg-white  px-2 py-2">
                  <ArrowRightIcon className="size-4 dark:text-primary " />
                </div>
              </Link>

              <h1 className="text-4xl md:text-4xl font-bold leading-tight mb-6 max-w-xl">
                We are a full service law firm based <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/10">
                  in Dar es Salaam, Tanzania
                </span>
              </h1>

              <p className="text-sm text-foreground/60 max-w-lg mb-8">
                Providing strategic, reliable and results driven legal services
                to both local and international clients. Established in 2014,
                the firm has built a strong reputation for excellence in
                corporate, commercial and litigation practice.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 mb-8">
                <Link href="/practise-area" className="w-full sm:w-auto ">
                  <Button
                    className="w-full py-6 px-7 rounded-full 
                  text-sm cursor-pointer px-4 py-2 bg-transparent border border-primary 
                  text-primary hover:bg-primary/80 hover:text-gray-200"
                  >
                    <AwardIcon />
                    10+ Years of experience
                  </Button>
                </Link>

                <BookConsultationButton />
              </div>
            </div>

            {/* Right */}
            <div className="mx-auto w-full max-w-lg">
              <div className="rounded-3xl overflow-hidden border border-white/6 shadow-2xl bg-linear-to-b from-black/50 to-transparent">
                <div className="relative aspect-16/10 bg-gray-900">
                  <img
                    src={mainImageUrl}
                    alt="agency-work-preview"
                    className="w-full h-full object-cover object-center"
                  />

                  <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-black/15 backdrop-blur-sm text-xs">
                    Experience • Integrity • Results
                  </div>

                  <div className="absolute right-4 bottom-4">
                    <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/6 backdrop-blur-sm hover:bg-white/10 transition focus:outline-none">
                      <div className="bg-primary p-2 rounded-full">
                        <ArrowRightIcon className="size-4" />
                      </div>
                      <span className="text-xs">View Practice Area</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3 items-center justify-start">
                {galleryStripImages.map((src, i) => (
                  <div
                    key={i}
                    className="w-14 h-10 rounded-lg overflow-hidden border border-white/6"
                  >
                    <img
                      src={src}
                      alt="project-thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="text-sm text-gray-400 ml-2 flex items-center gap-2">
                  <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping duration-300" />

                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </div>
                  500+ Completed cases
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
