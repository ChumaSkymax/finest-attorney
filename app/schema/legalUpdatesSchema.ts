import { z } from "zod";

export const legalUpdatesSchema = z.object({
  _id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  author: z.string().min(3, "Author must be at least 3 characters long"),
  publishedAt: z
    .string()
    .min(3, "Published At must be at least 3 characters long"),
  readTime: z.string().min(3, "Read Time must be at least 3 characters long"),
  featuredImage: z.string().url("Featured Image must be a valid URL"),
});

export type legalUpdatesSchema = z.infer<typeof legalUpdatesSchema>;
