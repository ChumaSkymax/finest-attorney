import { Skeleton } from "@/components/ui/skeleton";

// ----- Stat Cards Skeleton -----
function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-3 w-48" />
    </div>
  );
}

// ----- Chart Panel Skeleton -----
function ChartSkeleton() {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm flex flex-col gap-4">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-[220px] w-full rounded-xl" />
    </div>
  );
}

// ----- Latest Bookings Skeleton -----
function BookingCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-48" />
      <Skeleton className="h-3 w-full" />
      <div className="flex items-center justify-between mt-1">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  );
}

function LatestBookingsSkeleton() {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm flex flex-col gap-4">
      <Skeleton className="h-5 w-36" />
      {[1, 2, 3].map((i) => (
        <BookingCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ----- Popular Articles Skeleton -----
function ArticleRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-2">
      <Skeleton className="h-10 w-10 rounded-md shrink-0" />
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function PopularArticlesSkeleton() {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm flex flex-col gap-4">
      <Skeleton className="h-5 w-40" />
      {[1, 2, 3, 4, 5].map((i) => (
        <ArticleRowSkeleton key={i} />
      ))}
    </div>
  );
}

// ----- Main Dashboard Loading Export -----
export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 px-4 max-w-5xl mx-auto">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts + Panels */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
        <LatestBookingsSkeleton />
        <PopularArticlesSkeleton />
      </div>
    </div>
  );
}
