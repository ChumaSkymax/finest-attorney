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

export default function AddStaff() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(teamDataSchema),
    defaultValues: {
      name: "",
      role: "",
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof teamDataSchema>) => {
    console.log("Updated staff member:", values);
    setIsSubmitting(true);

    // TODO: Replace with your actual API call
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
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

          {/* ROLE */}
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="add-staff-role">
                  Role / Position
                </FieldLabel>
                <Input
                  {...field}
                  id="add-staff-role"
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
            name="image"
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
                    className="w-8 h-8 object-cover mt-3 rounded-full border"
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
