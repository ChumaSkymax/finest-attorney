import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const setUserRole = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (existingUser) {
      throw new Error("User already exists");
    }
    const id = await ctx.db.insert("users", {
      userId: args.userId,
      name: args.name,
      email: args.email,
      phone: args.phone,
      role: args.role,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return {
      id,
      name: args.name,
      email: args.email,
      phone: args.phone,
      role: args.role,
    };
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // STEP 1: Get the auth identity from the session.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // STEP 2: Look up the matching record in the custom users table.
    // The `userId` field stored in our users table matches the auth identity's `subject`.
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) return null;

    // STEP 3: Return the full user record including the role field.
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };
  },
});
