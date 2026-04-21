"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

interface PopularArticles {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  views: number;
  featuredImageId?: string;
}

export default function PopularArticles() {
  const popularArticles = useQuery(api.dashboard.getPopularArticles);

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Popular Articles</h1>
      <div className="flex flex-col gap-2">
        {popularArticles === undefined ? (
          // Show 5 skeleton placeholders while loading
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="flex-row items-center justify-between gap-4 p-4">
              <Skeleton className="w-12 h-12 rounded-sm" />
              <CardContent className="flex-1 p-0">
                <Skeleton className="h-4 w-[85%] mb-2" />
                <Skeleton className="h-3 w-[40%]" />
              </CardContent>
              <CardFooter className="p-0">
                <Skeleton className="h-5 w-16 rounded-full" />
              </CardFooter>
            </Card>
          ))
        ) : (
          popularArticles.map((article) => (
            <Link
              key={article._id}
              href={`/legalupdates/${article._id}`}
              className="block"
            >
              <Card className="flex-row items-center justify-between gap-4 p-4 cursor-pointer hover:bg-secondary/50 transition-colors">
                <div className="w-12 h-12 rounded-sm relative overflow-hidden bg-muted">
                  {/* Optional: we guard this incase an article has no image */}
                  {article.featuredImage && (
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {article.title}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-0 text-sm text-muted-foreground">
                  <Badge>
                    views{" "}
                    {(article.views || 0) >= 1000
                      ? ((article.views || 0) / 1000).toFixed(1) + "K"
                      : article.views || 0}
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
