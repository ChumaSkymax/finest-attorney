"use server";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { fetchAuthMutation } from "@/lib/auth-server";

/**
 * createServiceAction:
 * This Server Action handles the creation of new architectural Services.
 * Because creating a Service requires uploading a background/hero image,
 * it accepts raw `FormData` (rather than a simple JSON object).
 * It intercepts the File, uploads it securely to Convex Storage to generate
 * a storageId, and then patches that ID + text payloads to the database.
 */
export default async function createServiceAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    console.log("Step 1 - Fields:", { title, slug, description, hasImage: !!image });

    // Basic Validation
    if (!title || !slug || !description)
      throw new Error("Title, slug, and description are required");

    let storageId: Id<"_storage"> | undefined;

    if (image && image.size > 0) {
      console.log("Step 2 - Uploading image:", image.name, image.size);
      const serviceImageUrl = await fetchAuthMutation(
        api.services.generateServiceUploadUrl,
        {},
      );
      console.log("Step 3 - Got upload URL");

      const arrayBuffer = await image.arrayBuffer();
      const uploadResult = await fetch(serviceImageUrl, {
        method: "POST",
        headers: {
          "Content-Type": image.type,
        },
        body: arrayBuffer,
      });
      if (!uploadResult.ok) {
        throw new Error("Failed to upload image");
      }
      const result = await uploadResult.json();
      storageId = result.storageId;
      console.log("Step 4 - Image uploaded, storageId:", storageId);
    }

    console.log("Step 5 - Creating service in Convex...");
    const createServicesResult = await fetchAuthMutation(
      api.services.createService,
      {
        title,
        slug,
        description,
        imageId: storageId,
      },
    );
    console.log("Step 6 - Result:", createServicesResult);
    return createServicesResult;
  } catch (error) {
    console.error("createServiceAction ERROR:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create service",
    };
  }
}
