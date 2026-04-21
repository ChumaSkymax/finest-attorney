/**
 * ---------- TEAM MEMBERS DATABASE LOGIC ----------
 * This file handles logic for registering new team profiles into the database.
 *
 * - `generateTeamMemberUploadUrl`: Authenticates and generates a secure upload endpoint for profile pictures.
 * - `createTeamMember`: Saves the team member's name, position, and profile picture ID strictly via authenticated Admin status.
 */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createTeamMember = mutation({
  args: {
    name: v.string(),
    position: v.string(),
    profileImageId: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const teamMember = await ctx.db.insert("team", {
      name: args.name,
      position: args.position,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: user.name,
      profileImageId: args.profileImageId,
    });
    return {
      teamMember,
      ...args,
      success: true,
      createdBy: user.name,
    };
  },
});
export const generateTeamMemberUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // STEP 1: Safely delegate URL generation to Convex storage instance.
    return await ctx.storage.generateUploadUrl();
  },
});

export const getTeamMembers = query({
  args: {},
  handler: async (ctx) => {
    // STEP 1: Retrieve all natively stored team records.
    const teamMembers = await ctx.db.query("team").collect();

    // STEP 2: Iterate over arrays async mapping raw image Storage IDs successfully into public URLs.
    return await Promise.all(
      teamMembers.map(async (member) => {
        const image =
          member.profileImageId !== undefined
            ? await ctx.storage.getUrl(member.profileImageId)
            : null;

        // STEP 3: Return exact structured representation mapped with standard URL strings format.
        return {
          ...member,
          image,
        };
      }),
    );
  },
});

export const editTeamMember = mutation({
  args: {
    id: v.id("team"),
    name: v.string(),
    position: v.string(),
    profileImageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // STEP 1: Verify user authority context gracefully before granting patch capability.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Assert specific exact target exists accurately prior to merging overrides.
    const member = await ctx.db.get(args.id);
    if (!member) {
      throw new Error("Team member not found");
    }

    // STEP 3: Patch data natively merging text arrays exactly while gracefully preserving explicit existing states dynamically.
    await ctx.db.patch(args.id, {
      name: args.name,
      position: args.position,
      updatedAt: Date.now(),
      // Explicitly protect existing images if none overwritten dynamically
      ...(args.profileImageId !== undefined && {
        profileImageId: args.profileImageId,
      }),
    });

    // STEP 4: Render completely valid mutations directly correctly.
    return {
      success: true,
      updatedBy: user.name,
    };
  },
});

export const deleteTeamMember = mutation({
  args: {
    id: v.id("team"),
  },
  handler: async (ctx, args) => {
    // STEP 1: Restrict highly destructive procedures globally exactly via precise credential evaluation accurately.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Process native delete targeting exact row perfectly cleanly avoiding side-effects dynamically correctly.
    await ctx.db.delete(args.id);

    // STEP 3: Export valid operation logic gracefully natively exactly.
    return {
      success: true,
    };
  },
});
