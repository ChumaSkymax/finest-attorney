"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface HeroCardItem {
  id: number;
  title: string;
  description: string;
  href: string;
}

const heroCards: HeroCardItem[] = [
  {
    id: 1,
    title: "Our Lawyers",
    description:
      "Experienced legal professionals dedicated to protecting your rights and interests.",
    href: "/about-us",
  },
  {
    id: 2,
    title: "What We Do",
    description: "Comprehensive legal solutions across diverse practice areas.",
    href: "/practise-areas",
  },
  {
    id: 4,
    title: "Legal Updates",
    description: "Stay informed with the latest legal news and insights.",
    href: "/legalupdates",
  },
  {
    id: 5,
    title: "Our Story",
    description:
      "Founded with a vision to deliver trusted and practical legal solutions",
    href: "/about-us",
  },
  {
    id: 3,
    title: "Reach Us",
    description:
      "Connect with our team for consultations and legal assistance anytime.",
    href: "/contact",
  },
];

/**
 * Returns the number of cards visible at once based on viewport width.
 */
function getVisibleCount(): number {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
}

const INTERVAL_MS = 4000;

// Build an infinitely-looping list by prepending and appending clones.
// We clone `visibleCount` items on each side so the seam is always
// hidden behind the visible viewport.
const HeroCard = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [transitioning, setTransitioning] = useState(true);

  // `realIndex` tracks position inside the ORIGINAL array (dot indicators).
  const [realIndex, setRealIndex] = useState(0);

  // `trackIndex` is the position in the cloned track (starts offset by cloneCount).
  const cloneCount = visibleCount; // clones prepended/appended
  const [trackIndex, setTrackIndex] = useState(cloneCount);

  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isJumping = useRef(false);

  // Build cloned track: [tail clones] + [originals] + [head clones]
  const clonedCards = [
    ...heroCards.slice(-cloneCount),
    ...heroCards,
    ...heroCards.slice(0, cloneCount),
  ];

  // Total card width percentage per card
  const cardWidthPct = 100 / visibleCount;

  /* ─── Resize handling ─── */
  useEffect(() => {
    const onResize = () => {
      const next = getVisibleCount();
      setVisibleCount(next);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Whenever visibleCount changes, re-sync cloneCount offset without animation
  useEffect(() => {
    setTransitioning(false);
    setTrackIndex(cloneCount + realIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount]);

  /* ─── Infinite loop seam jump (no animation) ─── */
  const handleTransitionEnd = useCallback(() => {
    if (isJumping.current) return;
    const total = heroCards.length;

    if (trackIndex >= cloneCount + total) {
      // Went past the end tail → jump to real start
      isJumping.current = true;
      setTransitioning(false);
      const newTrack = cloneCount + (trackIndex - (cloneCount + total));
      setTrackIndex(newTrack);
      setRealIndex(newTrack - cloneCount);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumping.current = false;
          setTransitioning(true);
        });
      });
    } else if (trackIndex < cloneCount) {
      // Went before the head clones → jump to real end
      isJumping.current = true;
      setTransitioning(false);
      const newTrack = cloneCount + total + trackIndex - cloneCount;
      setTrackIndex(newTrack);
      setRealIndex(newTrack - cloneCount);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumping.current = false;
          setTransitioning(true);
        });
      });
    }
  }, [trackIndex, cloneCount]);

  /* ─── Navigation ─── */
  const step = 1; // always advance one card at a time for smoothness

  const goNext = useCallback(() => {
    setTransitioning(true);
    setTrackIndex((prev) => prev + step);
    setRealIndex((prev) => (prev + step) % heroCards.length);
  }, [step]);

  const goPrev = useCallback(() => {
    setTransitioning(true);
    setTrackIndex((prev) => prev - step);
    setRealIndex((prev) => (prev - step + heroCards.length) % heroCards.length);
  }, [step]);

  /* ─── Autoplay ─── */
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      goNext();
    }, INTERVAL_MS);
  }, [goNext]);

  useEffect(() => {
    setTransitioning(true);
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  const handleManualNav = (fn: () => void) => {
    fn();
    startAutoplay(); // reset interval on manual interaction
  };

  /* ─── Dot click (go to specific real card) ─── */
  const goToReal = (idx: number) => {
    setTransitioning(true);
    setRealIndex(idx);
    setTrackIndex(cloneCount + idx);
    startAutoplay();
  };

  /* ─── Compute transform ─── */
  const translateX = -(trackIndex * cardWidthPct);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 select-none">
      <div className="w-full max-w-6xl mx-auto flex items-center gap-4">
        {/* Prev button — desktop only */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => handleManualNav(goPrev)}
          className="hidden md:flex shrink-0 h-10 w-10 rounded-lg bg-primary text-primary-foreground border border-primary items-center justify-center cursor-pointer hover:opacity-80 transition-all z-10"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Track viewport */}
        <div className="flex-1 overflow-hidden mt-12 md:mt-6">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: "flex",
              width: `${(clonedCards.length / visibleCount) * 100}%`,
              transform: `translateX(${translateX / (clonedCards.length / visibleCount)}%)`,
              transition: transitioning
                ? "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "none",
              willChange: "transform",
            }}
          >
            {clonedCards.map((card, i) => (
              <div
                key={`${card.id}-${i}`}
                style={{
                  width: `${100 / clonedCards.length}%`,
                  padding: "0 14px",
                }}
              >
                <Link
                  href={card.href}
                  className="group bg-primary hover:-translate-y-1 transition duration-300 border border-border hover:border-primary rounded-2xl p-6 shadow-lg flex flex-col justify-center gap-4 h-full min-h-[160px]"
                  tabIndex={-1}
                >
                  <div className="">
                    <h2 className="text-2xl font-semibold text-white dark:text-gray-100 break-words ">
                      {card.title}
                    </h2>
                    <p className="text-sm text-white dark:text-gray-100 whitespace-pre-line break-words mt-1">
                      {card.description}
                    </p>
                  </div>
                  <ArrowRight
                    className="text-white/70 transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Next button — desktop only */}
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => handleManualNav(goNext)}
          className="hidden md:flex shrink-0 h-10 w-10 rounded-lg bg-primary text-primary-foreground border border-primary items-center justify-center cursor-pointer hover:opacity-80 transition-all z-10"
        >
          <ArrowRight size={20} className="text-white" />
        </button>
      </div>

      {/* Mobile row: prev · dots · next */}
      <div className="flex md:hidden items-center justify-center mt-6 gap-4">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => handleManualNav(goPrev)}
          className="h-8 w-8 rounded-lg bg-primary border border-primary flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {heroCards.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToReal(index)}
              className={`rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                index === realIndex
                  ? "w-6 h-3 bg-primary"
                  : "w-3 h-3 bg-muted hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => handleManualNav(goNext)}
          className="h-8 w-8 rounded-lg bg-primary border border-primary flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
        >
          <ArrowRight size={16} className="text-white" />
        </button>
      </div>
    </section>
  );
};

export default HeroCard;
