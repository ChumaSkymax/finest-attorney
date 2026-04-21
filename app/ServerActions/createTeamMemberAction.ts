"use server";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { fetchAuthMutation } from "@/lib/auth-server";

/**
 * createTeamMemberAction:
 * Similar to 'createServiceAction', this handles the creation of team members.
 * It expects a `FormData` object since it must process an uploaded 'profileImage' File 
 * securely into Convex Storage before submitting the final database text parameters (Name, Position).
 */
export default async function createTeamMemberAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const profileImage = (formData.get("profileImage") as File) || null;

    console.log("Step-Fields:", {
      name,
      position,
      hasprofileimage: !!profileImage,
    });
    // Basic Validation
    if (!name || !position) {
      throw new Error("Name and Position Required");
    }

    let storageId: Id<"_storage"> | undefined;

    if (profileImage && profileImage.size > 0) {
      console.log("Step 2-ProfileImage:", profileImage.name, profileImage.size);
      const teamImageUrl = await fetchAuthMutation(
        api.team.generateTeamMemberUploadUrl,
        {},
      );
      console.log("Step 3-TeamImageUrl:", teamImageUrl);

      const arrayBuffer = await profileImage?.arrayBuffer();
      const uploadResult = await fetch(teamImageUrl, {
        method: "POST",
        headers: {
          "Content-Type": profileImage?.type,
        },
        body: arrayBuffer,
      });
      if (!uploadResult.ok) {
        throw new Error("Failed to upload image");
      }
      const result = await uploadResult.json();
      storageId = result.storageId;
      console.log("Step 4-StorageId:", storageId);
    }

    const createTeamMember = await fetchAuthMutation(
      api.team.createTeamMember,
      {
        name,
        position,
        profileImageId: storageId,
      },
    );
    console.log("Step 5-CreateTeamMember:", createTeamMember);
    return createTeamMember;
  } catch (error) {
    console.log("Create Team Member Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
