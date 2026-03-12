"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import z from "zod";
import teamDataSchema from "@/app/schema/teamDataSchema";
import AddStaff from "@/components/Dashboard/TeamComponents/AddStaff";

const getTeamData = (): z.infer<typeof teamDataSchema>[] => {
  return [
    {
      _id: "t1",
      name: "Donald Jackman",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600",
      role: "Founder & CEO",
    },
    {
      _id: "t2",
      name: "Michael Brown",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600",
      role: "Head of Engineering",
    },
    {
      _id: "t3",
      name: "Olivia Martinez",
      image:
        "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?q=80&w=735&auto=format&fit=crop",
      role: "Product Designer",
    },
    {
      _id: "t4",
      name: "Ethan Walker",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
      role: "AI Systems Engineer",
    },
    {
      _id: "t5",
      name: "Sophia Lee",
      image:
        "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop",
      role: "UX Researcher",
    },
  ];
};

export default function ManageTeamPage() {
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this staff member?")) return;

    // TODO: Replace with your actual API call
    console.log("Deleting staff member:", id);
  };

  const data = getTeamData();
  const columns = getColumns(handleDelete);

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 rounded-md max-w-6xl mx-auto flex items-center justify-between">
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
