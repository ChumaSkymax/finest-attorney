"use client";

import { Button } from "@/components/ui/button";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import AddService from "@/components/Dashboard/ServicesComponents/AddService";
import getServiceData from "@/data/servicesData";

export default function ServicePage() {
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure?")) return;

    // await deleteService({ id });
  };
  const columns = getColumns(handleDelete);
  const data = getServiceData();
  return (
    <div className="relative">
      <div className="mb-8 px-4 py-2 rounded-md max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="font-semibold">All Services</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-auto">Add Service</Button>
          </SheetTrigger>
          <AddService />
        </Sheet>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
