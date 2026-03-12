"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Briefcase, User } from "lucide-react";

interface StaffDetails {
  _id: string;
  name: string;
  role: string;
  image: string;
}

interface Props {
  member: StaffDetails;
}

export default function ViewStaff({ member }: Props) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Staff Details</SheetTitle>
        <SheetDescription>
          View full details for this team member.
        </SheetDescription>
      </SheetHeader>

      <div className="px-4 mt-6 space-y-6">
        {/* Profile Photo */}
        <div className="flex justify-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-28 h-28 rounded-full object-cover border-2 border-muted"
          />
        </div>

        <Separator />

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Full Name</p>
              <p className="text-sm font-medium">{member.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Role / Position</p>
              <p className="text-sm font-medium">{member.role}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Meta */}
        <div className="text-xs text-muted-foreground">
          <span>Staff ID: {member._id}</span>
        </div>
      </div>
    </SheetContent>
  );
}
