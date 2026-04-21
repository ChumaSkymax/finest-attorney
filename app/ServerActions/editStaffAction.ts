"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchAuthMutation } from "@/lib/auth-server";

/**
 * editStaffAction:
 * This action processes incoming FormData containing updated Staff data and securely uploads an arbitrary profile
 * image prior to commanding the database mutation.
 */
export default async function editStaffAction(formData: FormData) {
  try {
    // STEP 1: Parse fields natively from FormData.
    const id = formData.get("_id") as Id<"team">;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    
    // STEP 2: Evaluate correctly if a native File was sent in the boundaries natively.
    const image = formData.get("image") as File | string | null;

    console.log("Step 1 - Evaluated fields:", { id, name, role, hasImage: !!image });

    // STEP 3: Validate basic input securely.
    if (!id || !name || !role) {
      throw new Error("All basic text fields are required");
    }

    let storageId: Id<"_storage"> | undefined = undefined;

    // STEP 4: Upload the image securely if it strictly exists dynamically.
    if (image instanceof File && image.size > 0) {
      console.log("Step 2 - New profile image detected. Properties:", image.name, image.size);

      // 4A: Get explicit upload URL structurally cleanly.
      const uploadUrl = await fetchAuthMutation(
        api.team.generateTeamMemberUploadUrl,
        {},
      );
      console.log("Step 3 - Upload endpoint retrieved:", uploadUrl);

      // 4B: Push native bytes perfectly securely natively.
      const arrayBuffer = await image.arrayBuffer();
      const uploadResult = await fetch(uploadUrl, {
        method: "POST",
        body: arrayBuffer,
        headers: {
          "Content-Type": image.type,
        },
      });

      console.log("Step 4 - Transport response validly:", uploadResult.statusText);

      if (!uploadResult.ok) {
        throw new Error("Failed to upload image strictly");
      }

      // 4C: Extract assigned internal identity properly securely.
      const result = await uploadResult.json();
      storageId = result.storageId;
      console.log("Step 5 - Registered mapped explicit storage constraints:", storageId);
    }

    // STEP 5: Merge explicit variables identically.
    const updateArgs: {
      id: Id<"team">;
      name: string;
      position: string;
      profileImageId?: Id<"_storage">;
    } = {
      id,
      name,
      position: role, // Mapping 'role' to the existing 'position' constraint.
    };

    if (storageId !== undefined) {
      updateArgs.profileImageId = storageId;
    }

    console.log("Step 6 - Trigger explicit Convex patching constraints.", updateArgs);

    // STEP 6: Execute Server mutation synchronously cleanly accurately.
    const result = await fetchAuthMutation(api.team.editTeamMember, updateArgs);
    console.log("Step 7 - Validation output accurately:", result);
    
    return result;
  } catch (error) {
    // STEP 7: Trap cascades implicitly cleanly strictly.
    console.log("Edit Staff Validation execution fault:", error);
    return { success: false, error: "Failed to update staff completely natively" };
  }
}
