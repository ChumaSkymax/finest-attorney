"use client";

import { Button } from "@/components/ui/button";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import AddService from "@/components/Dashboard/ServicesComponents/AddService";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";

export default function ServicePage() {
  const deleteService = useMutation(api.services.deleteService);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await deleteService({ id: id as Id<"services"> });
      toast.success("Service deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service.");
    }
  };
  const columns = getColumns(handleDelete);
  const services = useQuery(api.services.getServices);
  return (
    <div className="relative">
      <div className="mb-8 px-4 py-2 rounded-md max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="font-semibold">All Services</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-auto">Add Service</Button>
          </SheetTrigger>
          <AddService />
        </Sheet>
      </div>

      {services === undefined ? (
        <DataTableSkeleton columns={6} rows={13} />
      ) : (
        <DataTable columns={columns} data={services} />
      )}
    </div>
  );
}
