"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import getPreviewText from "@/components/web/getPreviewText";
import { Skeleton } from "@/components/ui/skeleton";
import Title from "@/components/web/Title";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  ArrowRightCircle,
  CalendarIcon,
  ChevronDown,
  ClockIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface ArticleData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  readTime: string;
  featuredImage?: string | null;
  author?: string;
  createdAt?: number;
  updatedAt?: number;
}

// Reusable card component to avoid duplication
function LegalUpdateCard({ article }: { article: ArticleData }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/legalupdates/${article._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={article.featuredImage || ""}
            alt={article.title}
            className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <Link href={`/legalupdates/${article._id}`}>
          <h2 className="text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h2>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {getPreviewText(article.description)}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <UserIcon className="h-3 w-3" />
            {article.author}
          </Badge>
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <CalendarIcon className="h-3 w-3" />
            {article.publishedAt}
          </Badge>
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <ClockIcon className="h-3 w-3" />
            {article.readTime}
          </Badge>
        </div>

        {/* CTA */}
        <div className="mt-auto  pt-4">
          <Link
            href={`/legalupdates/${article._id}`}
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

function LegalUpdateCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-sm flex flex-col">
      <Skeleton className="w-full h-[220px] rounded-none" />
      <div className="flex flex-col flex-1 p-6">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3 mt-1" />
        <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="mt-auto pt-4">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function LegalUpdates() {
  const articles = useQuery(api.legalupdates.getLegalUpdate);
  const [isOpen, setIsOpen] = useState(false);

  if (!articles) {
    return (
      <div className="relative mt-8 mb-20">
        <section className="mb-20 ">
          <div className="flex flex-col max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LegalUpdateCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative mt-8 mb-20">
      <section className="mb-20 ">
        <div className="flex flex-col max-w-6xl mx-auto px-4">
          {/* <Title
            title="Legal Updates"
            description="Stay informed with the latest legal updates and insights from our team of experienced lawyers."
            align="center"
          /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {articles.slice(0, 3).map((article) => (
              <LegalUpdateCard key={article._id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {articles.length > 3 && (
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
                  {articles.slice(3).map((article) => (
                    <LegalUpdateCard key={article._id} article={article} />
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
