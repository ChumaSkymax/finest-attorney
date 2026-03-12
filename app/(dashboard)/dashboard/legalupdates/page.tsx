"use client";

import { Button } from "@/components/ui/button";

import { DataTable } from "./data-table";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { getColumns } from "./columns";
import AddArticles from "@/components/Dashboard/LegalUpdatesComponents/AddArticles";
import getArticlesData from "@/data/LegalUpdatesData";

export default function () {
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure?")) return;

    // await deleteService({ id });
  };
  const data = getArticlesData();
  const columns = getColumns(handleDelete);
  return (
    <div className="relative">
      <div className="mb-8 px-4 py-2 rounded-md max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="font-semibold">All Articles</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-auto">Add Article</Button>
          </SheetTrigger>
          <AddArticles />
        </Sheet>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
