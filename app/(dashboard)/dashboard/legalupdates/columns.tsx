"use client";

import { legalUpdatesSchema } from "@/app/schema/legalUpdatesSchema";
import EditArticle from "@/components/Dashboard/LegalUpdatesComponents/EditArticle";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit2Icon, Trash } from "lucide-react";
import z from "zod";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<z.infer<typeof legalUpdatesSchema>>[] => [
  {
    accessorKey: "featuredImage",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("featuredImage") as string;
      return (
        <div>
          <img
            src={imageUrl}
            alt="article.title"
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
      const getPreviewText = (text: string, maxChars = 30) => {
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
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const article = row.original;
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
                <EditArticle article={article} />
              </SheetContent>
            </Sheet>

            {/* Delete Button */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(article._id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </>
      );
    },
  },
];
