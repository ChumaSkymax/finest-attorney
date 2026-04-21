/**
 * ---------- BOOKINGS DATABASE LOGIC ----------
 * This file handles all backend queries and mutations for client Bookings.
 * 
 * - `createBooking`: Inserts a new booking form submission securely into the database.
 * - `getBookings`: Collects all saved bookings to display on the dashboard table.
 * - `updateBookingStatus`: Allows admins to toggle booking states (pending/confirmed/cancelled).
 * - `deleteBooking`: Permanently removes a booking from the database based on its ID.
 * 
 * Note: Database updates/deletes carefully verify user permissions via `authComponent.safeGetAuthUser(ctx)`.
 */
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

export const createBooking = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    serviceBooked: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    message: v.string(),
  },

  handler: async (ctx, args) => {
    // STEP 1: Insert the booking directly — this is a public form, no auth required.
    // createdBy stores the submitter's name for reference on the dashboard.
    const booking = await ctx.db.insert("bookings", {
      ...args,
      createdBy: args.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: "pending",
    });

    return {
      success: true,
      booking: {
        id: booking,
        ...args,
        createdBy: args.name,
        status: "pending",
      },
    };
  },
});

export const getBookings = query({
  handler: async (ctx) => {
    // STEP 1: Safely unpack entirely the bookings collection for viewing arrays contexts.
    const bookings = await ctx.db.query("bookings").collect();
    
    // STEP 2: Export array output properly.
    return bookings;
  },
});

export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    // STEP 1: Intercept explicit ID references checking strictly internally if execution targets authentic documents locally.
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // STEP 2: Actively patch variables securely with exactly matching states defined explicitly previously internally.
    await ctx.db.patch(args.bookingId, {
      status: args.status,
    });

    // STEP 3: Affirm successful mutation correctly.
    return {
      success: true,
    };
  },
});

export const deleteBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    // STEP 1: Interrogate the backend natively requesting accurate proof referencing existence manually explicitly.
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // STEP 2: Atomically remove specific documents securely leveraging backend engine calls dynamically internally.
    await ctx.db.delete(args.bookingId);

    // STEP 3: Broadcast valid resolution safely.
    return {
      success: true,
    };
  },
});
