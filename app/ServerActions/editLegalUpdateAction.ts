"use server";

import { fetchAuthMutation } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

/**
 * editLegalUpdateAction:
 * Similar to the 'Add' action, but this safely handles the complexity of UPDATING records.
 * The primary challenge here is tracking whether the user completely swapped out the featured image, 
 * or if they just kept the old one. If they kept the old one, we don't upload anything new!
 */
export async function editLegalUpdateAction(formData: FormData) {
  try {
    const id = formData.get("id") as Id<"legalupdates">;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const publishedAt = formData.get("publishedAt") as string;
    const readTime = formData.get("readTime") as string;

    // This can be a File object if a new image was chosen,
    // or a string (the old URL) if unmodified.
    const featuredImage = formData.get("featuredImage") as File | string | null;

    if (!id || !title || !slug || !description || !publishedAt || !readTime) {
      throw new Error("Missing required fields");
    }

    // This storageId safely defaults to undefined. We ONLY populate it if an actual new image gets uploaded below!
    let storageId: Id<"_storage"> | undefined = undefined;

    // We check if the payload is a physical `<File>` object rather than just a plain text URL string.
    if (featuredImage instanceof File && featuredImage.size > 0) {
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

    // Build the args object
    const updateArgs: {
      id: Id<"legalupdates">;
      title: string;
      slug: string;
      description: string;
      publishedAt: string;
      readTime: string;
      featuredImageId?: Id<"_storage">;
    } = {
      id,
      title,
      slug,
      description,
      publishedAt,
      readTime,
    
    };

    // Only pass featuredImageId if a new one was uploaded
    // (If not passed, Convex patch will just leave the existing one alone)
    if (storageId !== undefined) {
      updateArgs.featuredImageId = storageId;
    }

    const legalUpdateResult = await fetchAuthMutation(
      api.legalupdates.editLegalUpdateAction,
      updateArgs,
    );

    console.log("Convex returned result:", legalUpdateResult);
    return legalUpdateResult;
  } catch (error) {
    console.error("editLegalUpdateAction error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update article",
    };
  }
}
