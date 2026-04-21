"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ViewBooking from "../BookingsComponents/ViewBooking";
import { Skeleton } from "@/components/ui/skeleton";

function BookingCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex items-center justify-between mt-1">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  );
}

export default function LatestBookings() {
  const latestBookings = useQuery(api.dashboard.getLatestBookings);

  // Show skeletons while data is loading
  if (!latestBookings) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-36" />
        {[1, 2, 3].map((i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-medium">Latest Bookings</h1>
      {latestBookings?.map((booking) => (
        <Card key={booking._id} className="flex flex-col gap-2">
          <CardHeader>
            <CardTitle>{booking.serviceBooked}</CardTitle>
            <div className="flex gap-4 items-center justify-between">
              <CardDescription>{booking.name}</CardDescription>
              <Badge
                variant={
                  booking.status === "pending"
                    ? "default"
                    : booking.status === "confirmed"
                      ? "secondary"
                      : "destructive"
                }
              >
                {booking.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-xs leading-relaxed text-gray-500">
              {booking.message}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs leading-relaxed text-gray-500">
              Booked on{" "}
              <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                {new Date(booking.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button>View</Button>
              </SheetTrigger>
              <ViewBooking booking={booking} />
            </Sheet>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
