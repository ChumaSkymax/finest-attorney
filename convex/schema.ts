import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { tables as authTables } from "./betterAuth/schema";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    userId: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user")),
  }),

  bookings: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    serviceBooked: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    message: v.string(),
    createdBy: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  legalupdates: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    publishedAt: v.string(),
    readTime: v.string(),
    featuredImageId: v.optional(v.id("_storage")),
    author: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    views: v.optional(v.number()),
  }),
  services: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(),
  }),
  team: defineTable({
    name: v.string(),
    position: v.string(),
    profileImageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(),
  }),
});
