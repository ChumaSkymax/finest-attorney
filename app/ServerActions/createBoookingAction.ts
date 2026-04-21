"use server";

import { bookingSchema } from "../schema/bookingsSchema";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * createBookingAction:
 * Public server action — no auth required.
 * Website visitors can submit bookings without being logged in.
 */
export async function createBookingAction(
  values: z.infer<typeof bookingSchema>,
) {
  try {
    const parsed = bookingSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    const results = await convex.mutation(api.bookings.createBooking, {
      message: parsed.data.message,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      serviceBooked: parsed.data.serviceBooked,
      preferredDate: parsed.data.preferredDate,
      preferredTime: parsed.data.preferredTime,
    });

    return results;
  } catch (error) {
    console.error("createBookingAction error:", error);
    return {
      success: false,
      error: "Failed to create booking",
    };
  }
}
