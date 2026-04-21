"use client";

import { ServiceSchema, serviceSchema } from "@/app/schema/serviceSchema";
import editServiceAction from "@/app/ServerActions/editServiceAction";
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
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useForm, Controller } from "@/lib/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import z from "zod";

interface IService {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

export default function EditService({ service }: { service: IService }) {
  const [preview, setPreview] = useState<string | null>(service?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editSchema = serviceSchema.extend({
    image: z.any().optional(),
  });

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: service?.title || "",
      slug: service?.slug || "",
      description: service?.description || "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof editSchema>) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("_id", service._id);
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      // Only append the image if a new file was selected.
      // We check `typeof values.image !== "string"` to ensure we're adding a File object,
      // rather than an existing image URL or an empty value.
      if (values.image && typeof values.image !== "string") {
        formData.append("image", values.image);
      }

      const result = await editServiceAction(formData);
      if (result.success) {
        toast.success("Service updated successfully");
        form.reset();
        setPreview(null);
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit Service</SheetTitle>
        <SheetDescription>Update the service details below.</SheetDescription>
      </SheetHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <FieldGroup>
          {/* TITLE */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="service-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="service-title"
                  placeholder="Enter Service Title"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* SLUG */}
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="service-slug">Slug</FieldLabel>
                <Input
                  {...field}
                  id="service-slug"
                  placeholder="corporate-commercial-law"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* DESCRIPTION */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="service-description">
                  Description
                </FieldLabel>
                <textarea
                  {...field}
                  id="service-description"
                  rows={8}
                  className="w-full border rounded-md p-2"
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
                    className="w-24 h-16 object-cover mt-3 rounded-md border"
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
              "Update Service"
            )}
          </Button>
        </FieldGroup>
      </form>
    </SheetContent>
  );
}
