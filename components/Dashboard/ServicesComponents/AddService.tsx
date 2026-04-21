"use client";

import { serviceSchema } from "@/app/schema/serviceSchema";
import createServiceAction from "@/app/ServerActions/createServiceAction";
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

const generateSlug = (value: string) => {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export default function AddService() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      if (values.image) {
        formData.append("image", values.image);
      }

      const result = await createServiceAction(formData);
      if (result.success) {
        toast.success("Service created successfully");
        form.reset();
        setPreview(null);
      } else {
        toast.error("Failed to create service");
      }
    } catch (error) {
      console.log("Error creating services:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SheetContent className="">
      <SheetHeader>
        <SheetTitle>Add Service</SheetTitle>
        <SheetDescription asChild>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="service-title">Title</FieldLabel>

                    <Input
                      {...field}
                      id="service-title"
                      type="text"
                      placeholder="Enter Service Title"
                      autoComplete="title"
                      aria-invalid={fieldState.invalid}
                      required
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        form.setValue("slug", generateSlug(value));
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="service-slug">Slug</FieldLabel>

                    <Input
                      {...field}
                      id="service-slug"
                      placeholder="eg. corporate-commercial-law"
                      aria-invalid={fieldState.invalid}
                      required
                      disabled
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="service-description">
                      Service Description
                    </FieldLabel>

                    <textarea
                      {...field}
                      id="service-description"
                      placeholder="Enter detailed service description"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      rows={6}
                      required
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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

                    {/* 👇 THIS is where preview shows */}
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-12 h-12 object-cover mt-4 rounded-md"
                      />
                    )}
                  </>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4 animate-spin" />
                    Adding Service
                  </>
                ) : (
                  "Add Service"
                )}
              </Button>
            </FieldGroup>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
