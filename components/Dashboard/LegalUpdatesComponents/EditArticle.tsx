/**
 * ========================================================
 * EDIT ARTICLE COMPONENT - Complete Guide for Future Projects
 * ========================================================
 * This is a highly robust "Form" component inside a sliding Sheet UI.
 * 
 * CORE ARCHITECTURE HOW-TO:
 * 1. Validation (Zod): We use a schema called `legalUpdatesSchema` to strictly force the user to type valid text (min lengths, etc). 
 * 2. Form Hook (React Hook Form): We feed that Zod schema into `useForm()`. This wires up all the text inputs automatically!
 * 3. FormData (The Engine): Because this form *can* upload actual image Files, we can't just send regular Javascript objects.
 *    Instead, we manually append every text field and the raw Image File into a physical `new FormData()` payload!
 * 4. Server Action: We send that massive `FormData` payload securely down to `editLegalUpdateAction` which processes the image upload 
 *    behind the scenes and then patches the database.
 * 
 * PRO-TIP for Image Previews:
 * Notice the `onChange` event directly on the standard `<Input type="file" />`. We use JavaScript's `FileReader()` 
 * to temporarily grab the new image the user just clicked, convert it to a local string URL, and instantly show it to them in `setPreview()`!
 */
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
import { editLegalUpdateAction } from "@/app/ServerActions/editLegalUpdateAction";
import { useForm, Controller } from "@/lib/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import z from "zod";

export interface ArticleData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  readTime: string;
  featuredImage?: string | null;
  author?: string;
  createdAt?: number;
  updatedAt?: number;
}

export default function EditArticle({ article }: { article: ArticleData }) {
  const [preview, setPreview] = useState<string | null>(
    article?.featuredImage || null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editSchema = legalUpdatesSchema.extend({
    featuredImage: z.any().optional(),
  });

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      description: article?.description || "",
      publishedAt: article?.publishedAt || "",
      readTime: article?.readTime || "",
      featuredImage: article?.featuredImage || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof editSchema>) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("id", article._id);
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      formData.append("publishedAt", values.publishedAt);
      formData.append("readTime", values.readTime);
      if (values.featuredImage && typeof values.featuredImage !== "string") {
        formData.append("featuredImage", values.featuredImage);
      }

      const result = await editLegalUpdateAction(formData);

      if (result.success) {
        toast.success("Article updated successfully");
        form.reset();
        setPreview(null);
      } else {
        toast.error(
          "error" in result
            ? (result.error as string)
            : "Failed to update article",
        );
      }
    } catch (error) {
      console.error("editLegalUpdateAction error:", error);
      toast.error("Failed to update article");
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="flex justify-center items-center gap-2">
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </div>
            ) : (
              "Update Article"
            )}
          </Button>
        </FieldGroup>
      </form>
    </SheetContent>
  );
}
