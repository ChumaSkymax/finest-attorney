"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useForm, Controller } from "@/lib/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import z from "zod";
import teamDataSchema from "@/app/schema/teamDataSchema";
import { TeamColumnType } from "@/app/(dashboard)/dashboard/manageTeam/columns";
import editStaffAction from "@/app/ServerActions/editStaffAction";
import { toast } from "sonner";

export default function EditStaff({ member }: { member: TeamColumnType }) {
  const [preview, setPreview] = useState<string | null>(member.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extend schema to allow optional images (since they only upload a new one if they want to override)
  const editSchema = teamDataSchema.extend({
    profileImage: z.any().optional(),
  });

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: member.name || "",
      position: member.position || "",
      profileImage: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof editSchema>) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("_id", member._id);
      formData.append("name", values.name);
      formData.append("role", values.position); // Note mapping to "role" in formData to match editStaffAction.ts

      // Attach file properly if uploaded
      if (values.profileImage instanceof File) {
        formData.append("image", values.profileImage);
      }

      const result = await editStaffAction(formData);

      if (result.success) {
        toast.success("Staff member updated effectively.");
        form.reset();
        // Option to close sheet automatically or reset state
      } else {
        toast.error((result as any).error || "Failed updates implicitly.");
      }
    } catch (error) {
      console.log("Submit error:", error);
      toast.error("An error occurred cleanly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit Staff Member</SheetTitle>
        <SheetDescription>
          Update the details for this team member.
        </SheetDescription>
      </SheetHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 space-y-4 px-4"
      >
        <FieldGroup>
          {/* NAME */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-staff-name">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="edit-staff-name"
                  type="text"
                  placeholder="Enter full name"
                  autoComplete="name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ROLE / POSITION */}
          <Controller
            name="position"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-staff-role">
                  Role / Position
                </FieldLabel>
                <Input
                  {...field}
                  id="edit-staff-role"
                  type="text"
                  placeholder="e.g. Senior Advocate"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* IMAGE */}
          <Controller
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <>
                <FieldLabel>Profile Photo</FieldLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    field.onChange(file);

                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") {
                        setPreview(reader.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-12 h-12 object-cover mt-3 rounded-md border"
                  />
                )}
              </>
            )}
          />

          {/* SUBMIT */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Staff Member"
            )}
          </Button>
        </FieldGroup>
      </form>
    </SheetContent>
  );
}
