"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit2Icon, Trash } from "lucide-react";
import { serviceSchema } from "@/app/schema/serviceSchema";
import z from "zod";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import EditService from "@/components/Dashboard/ServicesComponents/EditService";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<z.infer<typeof serviceSchema>>[] => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <div>
          <img
            src={imageUrl}
            alt="service.name"
            className="w-12 h-12 object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const getPreviewText = (text: string, maxChars = 80) => {
        if (!text) return "No description";
        if (text.length <= maxChars) return text;
        return text.slice(0, maxChars) + "...";
      };
      const description = row.getValue("description");
      return (
        <div>
          <p className="line-clamp-2 text-sm text-gray-500">
            {getPreviewText(description as string)}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;

      return (
        <>
          <div className="flex items-center gap-4">
            {/* Edit Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline">
                  <Edit2Icon className="h-4 w-4" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <EditService service={service} />
              </SheetContent>
            </Sheet>

            {/* Delete Button */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(service._id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </>
      );
    },
  },
];
