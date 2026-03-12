"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import getPreviewText from "@/components/web/getPreviewText";
import Title from "@/components/web/Title";
import getLegalUpdatesData from "@/data/LegalUpdatesData";
import {
  ArrowRightCircle,
  CalendarIcon,
  ChevronDown,
  ClockIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Reusable card component to avoid duplication
function LegalUpdateCard({
  update,
}: {
  update: ReturnType<typeof getLegalUpdatesData>[number];
}) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/legalupdates/${update.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={update.featuredImage}
            alt={update.title}
            className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <Link href={`/legalupdates/${update.slug}`}>
          <h2 className="text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {update.title}
          </h2>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {getPreviewText(update.description)}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <UserIcon className="h-3 w-3" />
            {update.author}
          </Badge>
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <CalendarIcon className="h-3 w-3" />
            {update.publishedAt}
          </Badge>
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <ClockIcon className="h-3 w-3" />
            {update.readTime}
          </Badge>
        </div>

        {/* CTA */}
        <div className="mt-auto  pt-4">
          <Link
            href={`/legalupdates/${update.slug}`}
            className="inline-flex items-center  gap-1.5 text-sm font-medium text-primary transition-colors"
          >
            Read More
            <ArrowRightCircle className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LegalUpdates() {
  const data = getLegalUpdatesData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-28 mb-20">
      <section className="mb-20 ">
        <div className="flex flex-col max-w-6xl mx-auto px-4">
          <Title
            title="Legal Updates"
            description="Stay informed with the latest legal updates and insights from our team of experienced lawyers."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {data.slice(0, 3).map((update) => (
              <LegalUpdateCard key={update._id} update={update} />
            ))}
          </div>
        </div>
      </section>

      {data.length > 3 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex flex-col items-center justify-center w-full mx-auto mb-8">
              <Button className="flex items-center justify-center gap-2">
                {isOpen ? "Show Less" : "See More Articles"}
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <section>
              <div className="flex flex-col max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                  {data.slice(3).map((update) => (
                    <LegalUpdateCard key={update._id} update={update} />
                  ))}
                </div>
              </div>
            </section>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
