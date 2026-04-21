"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-3 w-48 mt-2" />
    </div>
  );
}

export default function SectionCards() {
  const stats = useQuery(api.dashboard.getDashboardStats);
  const bookingStats = useQuery(api.dashboard.getBookingStats);
  const articleStats = useQuery(api.dashboard.getArticleStats);

  // Show skeletons while any query is loading
  if (!stats || !bookingStats || !articleStats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.totalBookings ?? "..."}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(bookingStats?.increase ?? 0) >= 0 ? (
                <TrendingUp className="text-primary" />
              ) : (
                <TrendingDown className="text-destructive" />
              )}
              {bookingStats?.increase}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {(bookingStats?.increase ?? 0) >= 0 ? (
              <>
                Bookings increased
                <TrendingUp className="size-4 text-primary" />
              </>
            ) : (
              <>
                Bookings decreased
                <TrendingDown className="size-4 text-destructive" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">Last 7 days bookings</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Pending Bookings</CardDescription>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.pendingBookings ?? "..."}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Total number of pending bookings
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Confirmed Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.confirmedBookings ?? "..."}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Total number of confirmed bookings
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Published Articles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.totalArticles ? stats?.totalArticles : "..."}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(articleStats?.increase ?? 0) >= 0 ? (
                <TrendingUp className="text-primary" />
              ) : (
                <TrendingDown className="text-destructive" />
              )}
              {articleStats?.increase}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Articles{" "}
            {(articleStats?.increase ?? 0) >= 0 ? "increased" : "decreased"}{" "}
            {(articleStats?.increase ?? 0) >= 0 ? (
              <TrendingUp className="size-4 text-primary" />
            ) : (
              <TrendingDown className="size-4 text-destructive" />
            )}
          </div>
          <div className="text-muted-foreground text-xs">
            Last 7 days published articles
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
