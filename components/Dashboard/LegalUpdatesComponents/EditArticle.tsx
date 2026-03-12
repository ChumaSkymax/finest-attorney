"use client";

import { legalUpdatesSchema } from "@/app/schema/legalUpdatesSchema";
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
import z from "zod";

export default function EditArticle({
  article,
}: {
  article: legalUpdatesSchema;
}) {
  const [preview, setPreview] = useState<string | null>(
    article?.featuredImage || null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(legalUpdatesSchema),
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      description: article?.description || "",
      publishedAt: article?.publishedAt || "",
      readTime: article?.readTime || "",
      author: article?.author || "",
      featuredImage: article?.featuredImage || "",
    },
  });

  const onSubmit = (values: z.infer<typeof legalUpdatesSchema>) => {
    console.log("Updated values:", values);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit Article</SheetTitle>
        <SheetDescription>Update the article below.</SheetDescription>
      </SheetHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <FieldGroup>
          {/* TITLE */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="article-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="article-title"
                  placeholder="Enter Article Title"
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
                <FieldLabel htmlFor="article-slug">Slug</FieldLabel>
                <Input
                  {...field}
                  id="article-slug"
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
                <FieldLabel htmlFor="article-description">
                  Description
                </FieldLabel>
                <textarea
                  {...field}
                  id="article-description"
                  rows={8}
                  className="w-full border rounded-md p-2"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* PUBLISHED AT */}
          <Controller
            name="publishedAt"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="article-publishedAt">
                  Published At
                </FieldLabel>
                <Input
                  {...field}
                  id="article-publishedAt"
                  placeholder="Enter Article Published At"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* READ TIME */}
          <Controller
            name="readTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="article-readTime">Read Time</FieldLabel>
                <Input
                  {...field}
                  id="article-readTime"
                  placeholder="Enter Article Read Time"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* IMAGE */}
          <Controller
            name="featuredImage"
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
              "Update Article"
            )}
          </Button>
        </FieldGroup>
      </form>
    </SheetContent>
  );
}
