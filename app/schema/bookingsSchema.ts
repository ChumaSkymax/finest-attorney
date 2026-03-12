import z from "zod";

export const bookingSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  serviceBooked: z.string(),
  preferredDate: z.string(),
  preferredTime: z.string(),
  message: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

export type BookingData = z.infer<typeof bookingSchema>;
