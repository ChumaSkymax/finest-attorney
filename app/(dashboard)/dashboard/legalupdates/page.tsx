"use client";

import { Button } from "@/components/ui/button";

import { DataTable } from "./data-table";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { getColumns } from "./columns";
import AddArticles from "@/components/Dashboard/LegalUpdatesComponents/AddArticles";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";

export default function () {
  const articles = useQuery(api.legalupdates.getLegalUpdate);
  const deleteArticle = useMutation(api.legalupdates.deleteArticle);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      await deleteArticle({ id: id as Id<"legalupdates"> });
      toast.success("Article deleted successfully");
    } catch (error) {
      console.error("Failed to delete article", error);
      toast.error("Failed to delete article");
    }
  };

  const columns = getColumns(handleDelete);
  return (
    <div className="relative">
      <div className="mb-8 px-4 py-2 rounded-md max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="font-semibold">All Articles</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-auto">Add Article</Button>
          </SheetTrigger>
          <AddArticles />
        </Sheet>
      </div>

      {articles === undefined ? (
        <DataTableSkeleton columns={6} rows={13} />
      ) : (
        <DataTable columns={columns} data={articles} />
      )}
    </div>
  );
}
