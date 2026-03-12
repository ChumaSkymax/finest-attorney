"use client";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  bookingId: string;
  currentStatus: string;
}

export default function UpdateBookingsStatus({
  bookingId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      // TODO: Replace with your actual API call, e.g.:
      // await fetch(`/api/bookings/${bookingId}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status }),
      // });

      console.log(`Updating booking ${bookingId} status to: ${status}`);

      // Simulate API delay for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Booking status updated successfully!");
    } catch (error) {
      console.error("Failed to update booking status:", error);
      alert("Failed to update booking status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Update Booking Status</SheetTitle>
        <SheetDescription>Change booking status below.</SheetDescription>
      </SheetHeader>

      <div className="space-y-4 mt-4 px-4">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleUpdate}
          className="w-full"
          disabled={loading || status === currentStatus}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Status"
          )}
        </Button>
      </div>
    </>
  );
}
