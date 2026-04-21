"use server";

import { fetchAuthMutation } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

/**
 * addLegalUpdateAction:
 * This is a "Server Action" which means this function only strictly runs on the server (never in the browser).
 * It receives fresh `FormData` directly from the AddArticle UI form. 
 * 
 * Its main job is to:
 * 1. Parse out all the specific text inputs (title, slug, etc.)
 * 2. Intercept an uploaded image, transform it into binary (ArrayBuffer), and upload it securely to Convex Storage.
 * 3. Send all compiled data along with the new image's safe storage ID down to the `createLegalUpdate` mutation!
 */
export async function addLegalUpdateAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const publishedAt = formData.get("publishedAt") as string;
    const readTime = formData.get("readTime") as string;
    const featuredImage = formData.get("featuredImage") as File | null;

    // Basic validation
    if (!title || !slug || !description || !publishedAt || !readTime) {
      throw new Error("Missing required fields");
    }

    // Initialize an empty variable to hold the new image's database ID once it finishes uploading
    let storageId: Id<"_storage"> | undefined;

    // Check if the user really did upload a physical File (and that it isn't an empty file)
    if (featuredImage && featuredImage.size > 0) {
      // Get the upload URL from Convex
      const legalUpdateImageUrl = await fetchAuthMutation(
        api.legalupdates.generatedLegalUpdateImageUrl,
        {},
      );

      // Convert File to ArrayBuffer for upload
      const arrayBuffer = await featuredImage.arrayBuffer();

      const uploadResult = await fetch(legalUpdateImageUrl, {
        method: "POST",
        headers: {
          "Content-Type": featuredImage.type,
        },
        body: arrayBuffer,
      });

      if (!uploadResult.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await uploadResult.json();
      storageId = result.storageId;
    }

    const legalUpdateResult = await fetchAuthMutation(
      api.legalupdates.createLegalUpdate,
      {
        title,
        slug,
        description,
        publishedAt,
        readTime,
        featuredImageId: storageId,
      },
    );
    console.log("Convex returned result:", legalUpdateResult);
    return legalUpdateResult;
  } catch (error) {
    console.error("addLegalUpdateAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add legal update",
    };
  }
}
