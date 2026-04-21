"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchAuthMutation } from "@/lib/auth-server";

export default async function editServiceAction(formData: FormData) {
  try {
    // STEP 1: Extract form values
    // We retrieve the raw string and file data submitted in the boundary FormData object.
    const id = formData.get("_id") as Id<"services">;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | string | null;

    // STEP 2: Basic validation
    // Ensure all crucial text properties are populated before doing any further operations.
    if (!id || !title || !description) {
      throw new Error("All fields are required");
    }
    let storageId: Id<"_storage"> | undefined = undefined;

    // STEP 3: Conditionally process image upload
    // If the frontend passed a new image File (instead of a string URL or nothing), we'll upload it.
    if (image instanceof File && image.size > 0) {
      // 3A: Generate a secure upload URL from Convex storage.
      const serviceImageUrl = await fetchAuthMutation(
        api.services.generateServiceUploadUrl,
        {},
      );
      console.log("serviceImageUrl", serviceImageUrl);

      // 3B: Convert the File to a format parseable via HTTP PUT (ArrayBuffer) and send it.
      const arrayBuffer = await image.arrayBuffer();
      const uploadResult = await fetch(serviceImageUrl, {
        method: "POST",
        body: arrayBuffer,
        headers: {
          "Content-Type": image.type,
        },
      });

      console.log("uploadResult", uploadResult);

      // 3C: Ensure the cloud upload worked correctly.
      if (!uploadResult.ok) {
        throw new Error("Failed to upload image");
      }

      // 3D: Parse the newly generated storage ID so it can be linked to the record on the database.
      const result = await uploadResult.json();
      console.log("result", result);
      storageId = result.storageId;
    }

    // STEP 4: Formulate the database mutation args
    // We construct the base metadata containing the standard updated text fields.
    const updateArgs: {
      _id: Id<"services">;
      title: string;
      slug: string;
      description: string;
      imageId?: Id<"_storage">;
    } = {
      _id: id,
      title,
      slug,
      description,
    };

    // STEP 5: Factor in the new image (if uploaded)
    // We only change the image ID if we actively uploaded one in Step 3. Otherwise we leave it out (retaining whatever exists on DB).
    if (storageId !== undefined) {
      updateArgs.imageId = storageId;
    }
    console.log("updateArgs", updateArgs);

    // STEP 6: Execute Convex mutation
    // Calls `updateService` reliably over the protected Next.js / Convex route integration.
    const result = await fetchAuthMutation(
      api.services.updateService,
      updateArgs,
    );
    console.log("result", result);
    return result;
  } catch (error) {
    // STEP 7: Handle runtime errors gracefully
    // Bubble the error down safely as an object so the frontend UI can show an alert or toast.
    console.log(error);
    return { success: false, error: "Failed to update service" };
  }
}
