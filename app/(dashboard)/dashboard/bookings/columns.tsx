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
  serviceBooked: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  createdBy: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: number;
  updatedAt: number;
};

const ActionsCell = ({
  booking,
  handleDelete,
  handleStatusUpdate,
}: {
  booking: BookingsData;
  handleDelete: (id: string) => void;
  handleStatusUpdate: (
    id: string,
    status: "pending" | "confirmed" | "cancelled",
  ) => void;
}) => {
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
        variant="outline"
        onClick={() => handleDelete(booking._id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const getColumns = (
  handleDelete: (id: string) => void,
  handleStatusUpdate: (
    id: string,
    status: "pending" | "confirmed" | "cancelled",
  ) => void,
): ColumnDef<BookingsData>[] => [
  {
    accessorKey: "serviceBooked",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Service
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium max-w-[160px] truncate block">
        {row.getValue("serviceBooked")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Name
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Email
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Phone
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground tabular-nums">
        {row.getValue("phone")}
      </span>
    ),
  },
  {
    accessorKey: "preferredDate",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Date
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-xs tabular-nums">
        {row.getValue("preferredDate")}
      </span>
    ),
  },
  {
    accessorKey: "preferredTime",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Time
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-xs tabular-nums">
        {row.getValue("preferredTime")}
      </span>
    ),
  },
  {
    accessorKey: "message",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Message
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground max-w-[150px] truncate block">
        {row.getValue("message")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Status
      </span>
    ),
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const styles: Record<string, string> = {
        pending:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        confirmed:
          "bg-primary text-primary-foreground dark:bg-primary/30 dark:text-primary-foreground",
        cancelled:
          "bg-destructive text-destructive-foreground dark:bg-red-900/40 dark:text-red-100",
      };
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || ""}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Created
      </span>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue<number>("createdAt"));
      return (
        <span className="text-xs text-muted-foreground tabular-nums">
          {date.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <ActionsCell
          booking={booking}
          handleDelete={handleDelete}
          handleStatusUpdate={handleStatusUpdate}
        />
      );
    },
  },
];
