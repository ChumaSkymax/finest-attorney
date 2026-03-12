"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Scale,
  User,
} from "lucide-react";

interface BookingDetails {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Props {
  booking: BookingDetails;
}

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "confirmed":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}

export default function ViewBooking({ booking }: Props) {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Booking Details</SheetTitle>
        <SheetDescription>View full details for this booking.</SheetDescription>
      </SheetHeader>

      <div className="px-4 space-y-6 mt-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge variant={getStatusBadgeVariant(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>

        <Separator />

        {/* Client Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Client Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium">{booking.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{booking.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{booking.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Booking Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Booking Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Scale className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                <p className="text-sm font-medium">{booking.service}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Preferred Date</p>
                <p className="text-sm font-medium">{booking.preferredDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Preferred Time</p>
                <p className="text-sm font-medium">{booking.preferredTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Message</p>
                <p className="text-sm font-medium">{booking.message}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Booking ID: {booking._id}</span>
          <span>Created: {booking.createdAt}</span>
        </div>
      </div>
    </SheetContent>
  );
}
