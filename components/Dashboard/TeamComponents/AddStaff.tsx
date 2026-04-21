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
import { toast } from "sonner";
import z from "zod";
import teamDataSchema from "@/app/schema/teamDataSchema";
import createTeamMemberAction from "@/app/ServerActions/createTeamMemberAction";

export default function AddStaff() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(teamDataSchema),
    defaultValues: {
      name: "",
      position: "",
      profileImage: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof teamDataSchema>) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("position", values.position);
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      const result = await createTeamMemberAction(formData);
      if (result.success) {
        toast.success("Team member added successfully");
        form.reset();
        setPreview(null);
      } else {
        toast.error("Failed to add team member");
      }
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error("Failed to add team member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Add Staff Member</SheetTitle>
        <SheetDescription>Add a new team member.</SheetDescription>
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
                <FieldLabel htmlFor="add-staff-name">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="add-staff-name"
                  type="text"
                  placeholder="Enter full name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* POSITION */}
          <Controller
            name="position"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-staff-position">
                  Role / Position
                </FieldLabel>
                <Input
                  {...field}
                  id="add-staff-position"
                  type="text"
                  placeholder="e.g. Senior Advocate"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  required
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
            render={({ field, fieldState }) => (
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-8 h-8 object-cover mt-3 rounded-full border"
                  />
                )}
              </>
            )}
          />

          {/* SUBMIT */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                Adding Team Member...
              </div>
            ) : (
              "Add Staff Member"
            )}
          </Button>
        </FieldGroup>
      </form>
    </SheetContent>
  );
}
