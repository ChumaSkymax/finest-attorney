"use client";

import teamDataSchema from "@/app/schema/teamDataSchema";
import EditStaff from "@/components/Dashboard/TeamComponents/EditStaff";
import ViewStaff from "@/components/Dashboard/TeamComponents/ViewStaff";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, Eye, Trash } from "lucide-react";
import z from "zod";

export const getColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<z.infer<typeof teamDataSchema>>[] => [
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <div>
          <img
            src={imageUrl}
            alt={row.getValue("name") as string}
            className="w-10 h-10 object-cover rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex items-center gap-2">
          {/* View Staff */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Eye className="h-4 w-4" />
                <span className="sr-only">View Staff</span>
              </Button>
            </SheetTrigger>
            <ViewStaff member={member} />
          </Sheet>

          {/* Edit Staff */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <Edit2Icon className="h-4 w-4" />
                <span className="sr-only">Edit Staff</span>
              </Button>
            </SheetTrigger>
            <EditStaff member={member} />
          </Sheet>

          {/* Delete Staff */}
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8"
            onClick={() => handleDelete(member._id)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete Staff</span>
          </Button>
        </div>
      );
    },
  },
];
