/**
 * ---------- SERVICES DATABASE LOGIC ----------
 * This file manages backend mutations for creating and maintaining Services.
 *
 * - `generateServiceUploadUrl`: Asks Convex to generate a temporary, secure URL so the frontend can directly upload an image file.
 * - `createService`: Inserts a new mapped Service (complete with an uploaded image's storage ID) directly into the database.
 */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createService = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // STEP 1: Authenticate the user session before allowing creation.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Securely insert data into the 'services' table, applying timestamps and associating the user.
    const service = await ctx.db.insert("services", {
      ...args,
      createdBy: user.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      imageId: args.imageId,
    });

    // STEP 3: Return success context back to the frontend action.
    return {
      service,
      ...args,
      success: true,
      createdBy: user.name,
    };
  },
});

export const generateServiceUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // STEP 1: Request an ephemeral upload URL directly from Convex storage systems.
    return await ctx.storage.generateUploadUrl();
  },
});

export const getServices = query({
  args: {},
  handler: async (ctx) => {
    // STEP 1: Query the 'services' table and retrieve all records.
    const services = await ctx.db.query("services").collect();

    // STEP 2: Systematically map over every service to resolve image storage files into public viewing URLs.
    return await Promise.all(
      services.map(async (service) => {
        // Evaluate if step-by-step resolution is needed based on available storage IDs.
        const image =
          service.imageId !== undefined
            ? await ctx.storage.getUrl(service.imageId)
            : null;

        // STEP 3: Return the unified JSON containing the text fields + the image URL.
        return {
          ...service,
          image,
        };
      }),
    );
  },
});

export const updateService = mutation({
  args: {
    _id: v.id("services"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // STEP 1: Confirm the caller is highly verified/authenticated.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Ask the database rigorously if the target service explicitly exists.
    const service = await ctx.db.get(args._id);
    if (!service) {
      throw new Error("Service not found");
    }

    // STEP 3: Execute patch to safely overwrite variables without blowing away existing ones.
    await ctx.db.patch(args._id, {
      ...args,
      updatedAt: Date.now(),
    });

    // STEP 4: Transmit the confirmation back intact.
    return {
      service,
      ...args,
      success: true,
      updatedBy: user.name,
    };
  },
});

export const getServiceById = query({
  args: {
    id: v.id("services"),
  },
  handler: async (ctx, args) => {
    // STEP 1: Fetch the single service document by its Convex ID.
    const service = await ctx.db.get(args.id);
    if (!service) return null;

    // STEP 2: Resolve the image storage ID into a public URL.
    const image =
      service.imageId !== undefined
        ? await ctx.storage.getUrl(service.imageId)
        : null;

    // STEP 3: Return the combined service data with resolved image URL.
    return {
      ...service,
      image,
    };
  },
});

export const deleteService = mutation({
  args: {
    id: v.id("services"),
  },
  handler: async (ctx, args) => {
    // STEP 1: Disallow rogue actors from triggering cascading database deletes via contextual user checking.
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // STEP 2: Command the table specifically passing target document ID explicitly.
    await ctx.db.delete(args.id);

    // STEP 3: Surface operation execution truth securely.
    return {
      success: true,
    };
  },
});
