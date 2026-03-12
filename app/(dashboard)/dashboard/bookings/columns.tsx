"use client";

import ViewBooking from "@/components/Dashboard/BookingsComponents/ViewBooking";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash } from "lucide-react";

export type BookingsData = {
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
};

const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
  try {
    // TODO: Replace with your actual API call, e.g.:
    // await fetch(`/api/bookings/${bookingId}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ status: newStatus }),
    // });

    console.log(`Updating booking ${bookingId} status to: ${newStatus}`);
    alert(`Booking status updated to: ${newStatus}`);
  } catch (error) {
    console.error("Failed to update booking status:", error);
    alert("Failed to update booking status.");
  }
};

export const getColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<BookingsData>[] => [
  {
    accessorKey: "service",
    header: "Service Booked",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "preferredDate",
    header: "Preferred Date",
  },
  {
    accessorKey: "preferredTime",
    header: "Preferred Time",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <div className="flex items-center gap-2">
          {/* View Booking - Eye Icon */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Eye className="h-4 w-4" />
                <span className="sr-only">View Booking</span>
              </Button>
            </SheetTrigger>
            <ViewBooking booking={booking} />
          </Sheet>

          {/* Update Status Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Update Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-xs">
                Change Status
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(booking._id, "pending")}
                disabled={booking.status === "pending"}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(booking._id, "confirmed")}
                disabled={booking.status === "confirmed"}
              >
                Confirmed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(booking._id, "cancelled")}
                disabled={booking.status === "cancelled"}
              >
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete Button */}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(booking._id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
