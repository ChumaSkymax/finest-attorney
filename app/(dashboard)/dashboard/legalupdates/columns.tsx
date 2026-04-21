"use client";

import { legalUpdatesSchema } from "@/app/schema/legalUpdatesSchema";
import EditArticle, {
  ArticleData,
} from "@/components/Dashboard/LegalUpdatesComponents/EditArticle";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit2Icon, Trash } from "lucide-react";
import z from "zod";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<ArticleData>[] => [
  {
    accessorKey: "featuredImage",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Image
      </span>
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue("featuredImage") as string;
      return (
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="article"
              className="w-12 h-12 object-cover rounded-md"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xs text-muted-foreground">
              None
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Description
      </span>
    ),
    cell: ({ row }) => {
      const getPreviewText = (text: string, maxChars = 30) => {
        if (!text) return "No description";
        if (text.length <= maxChars) return text;
        return text.slice(0, maxChars) + "...";
      };
      const description = row.getValue("description");
      return (
        <span className="text-xs text-muted-foreground block max-w-[200px]">
          {getPreviewText(description as string, 50)}
        </span>
      );
    },
  },
  {
    accessorKey: "author",
    header: () => (
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Author
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.getValue("author") || "Admin"}</span>
    ),
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

              <EditArticle article={article} />
            </Sheet>

            {/* Delete Button */}
            <Button
              size="sm"
              variant="outline"
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
