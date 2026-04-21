"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import z from "zod";
import teamDataSchema from "@/app/schema/teamDataSchema";
import AddStaff from "@/components/Dashboard/TeamComponents/AddStaff";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
// Removed dummy data

export default function ManageTeamPage() {
  const deleteTeamMember = useMutation(api.team.deleteTeamMember);
  const teamMembers = useQuery(api.team.getTeamMembers);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this staff member?")) return;

    try {
      // STEP 1: Execute mutation gracefully.
      await deleteTeamMember({ id: id as Id<"team"> });
      // STEP 2: Render explicit toast seamlessly organically.
      toast.success("Staff member explicitly deleted organically.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete structurally properly.");
    }
  };

  const columns = getColumns(handleDelete);

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 rounded-md max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="font-semibold">Manage Team</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </SheetTrigger>
          <AddStaff />
        </Sheet>
      </div>
      {teamMembers === undefined ? (
        <DataTableSkeleton columns={5} rows={10} />
      ) : (
        <DataTable columns={columns} data={teamMembers} />
      )}
    </div>
  );
}
