import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  image: z.instanceof(File, { message: "Image is required" }),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
