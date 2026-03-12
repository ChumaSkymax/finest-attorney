"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BookingsData, getColumns } from "./columns";
import { DataTable } from "./data-table";
import AddBookings from "@/components/Dashboard/BookingsComponents/Addbookings";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

const getBookings = (): BookingsData[] => {
  return [
    {
      _id: "b1",
      name: "John Mwakyusa",
      email: "john.mwakyusa@gmail.com",
      phone: "+255712345678",
      service: "Corporate and Commercial Law",
      preferredDate: "2026-03-05",
      preferredTime: "10:00 AM",
      message: "Seeking legal advice on company registration.",
      status: "pending",
      createdAt: "2026-02-20",
    },
    {
      _id: "b2",
      name: "Asha Mohamed",
      email: "asha.mohamed@yahoo.com",
      phone: "+255754987321",
      service: "Labour Law",
      preferredDate: "2026-03-07",
      preferredTime: "02:00 PM",
      message: "Need assistance with an employment dispute.",
      status: "confirmed",
      createdAt: "2026-02-21",
    },
    {
      _id: "b3",
      name: "Peter Kimaro",
      email: "peter.kimaro@gmail.com",
      phone: "+255718223344",
      service: "Real Estate and Conveyancing",
      preferredDate: "2026-03-10",
      preferredTime: "09:00 AM",
      message: "Legal support for land transfer process.",
      status: "pending",
      createdAt: "2026-02-22",
    },
    {
      _id: "b4",
      name: "Neema Joseph",
      email: "neema.joseph@outlook.com",
      phone: "+255762998877",
      service: "Intellectual Property and Trademarks",
      preferredDate: "2026-03-12",
      preferredTime: "11:30 AM",
      message: "Trademark registration for my business.",
      status: "cancelled",
      createdAt: "2026-02-22",
    },
    {
      _id: "b5",
      name: "David Mushi",
      email: "david.mushi@gmail.com",
      phone: "+255713445566",
      service: "Litigation and Arbitration",
      preferredDate: "2026-03-15",
      preferredTime: "03:30 PM",
      message: "Representation in a commercial dispute.",
      status: "confirmed",
      createdAt: "2026-02-23",
    },
    {
      _id: "b6",
      name: "Fatma Hassan",
      email: "fatma.hassan@gmail.com",
      phone: "+255755667788",
      service: "Insurance Law",
      preferredDate: "2026-03-18",
      preferredTime: "04:00 PM",
      message: "Advice regarding an insurance claim.",
      status: "pending",
      createdAt: "2026-02-24",
    },
  ];
};

export default function BookingsPage() {
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure?")) return;

    // await deleteService({ id });
  };
  const data = getBookings();
  const columns = getColumns(handleDelete);
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 rounded-md max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="font-semibold">All Bookings</h1>
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
