/**
 * ========================================================
 * BACKEND DATA TABLE COMPONENT - (Bookings Dashboard Page)
 * ========================================================
 * This is exactly how you connect a database securely into a beautiful Table layout!
 *
 * HOW THIS PAGE WORKS:
 * 1. `useQuery`: We instantly ping the Convex database directly from the frontend to fetch all `bookings` via `api.bookings.getBookings`.
 * 2. Loading State: It takes a few milliseconds for data to come back over the internet. While `bookings` is `undefined`,
 *    we display a nice pulsing `<DataTableSkeleton />` so the page doesn't glitch or look frozen!
 * 3. `useMutation`: We define database-altering actions (like `deleteBooking` or `updateBookingStatus`) here at the parent level.
 * 4. The Magic Handoff: We wrap all those powerful mutations into simple functions (like `handleDelete`),
 *    and pass them deep into `getColumns()`. That way, the tiny little <Button> running inside the table's "Action" column
 *    can magically trigger massive database deletes securely from the parent context!
 */
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import AddBookings from "@/components/Dashboard/BookingsComponents/Addbookings";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export default function BookingsPage() {
  const bookings = useQuery(api.bookings.getBookings);
  console.log(bookings);

  const deleteBooking = useMutation(api.bookings.deleteBooking);
  const updateBookingStatus = useMutation(api.bookings.updateBookingStatus);

  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: "pending" | "confirmed" | "cancelled",
  ) => {
    try {
      await updateBookingStatus({
        bookingId: bookingId as Id<"bookings">,
        status: newStatus,
      });

      console.log(`Updating booking ${bookingId} status to: ${newStatus}`);
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update booking status:", error);
      toast.error("Failed to update booking status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking({ bookingId: id as Id<"bookings"> });
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Failed to delete booking:", error);
      toast.error("Failed to delete booking");
    }
  };

  const columns = getColumns(handleDelete, handleStatusUpdate);

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 rounded-md max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-semibold">All Bookings</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml">
              <Plus className="mr-2 h-4 w-4" />
              Add Booking
            </Button>
          </SheetTrigger>
          <AddBookings />
        </Sheet>
      </div>

      {/* 👇 Show skeleton while data is loading, then the real table */}
      {bookings === undefined ? (
        <DataTableSkeleton columns={9} rows={6} />
      ) : (
        <DataTable columns={columns} data={bookings} />
      )}
    </div>
  );
}
