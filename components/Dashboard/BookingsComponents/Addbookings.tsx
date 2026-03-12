"use client";

import { bookingSchema } from "@/app/schema/bookingsSchema";
import { serviceSchema } from "@/app/schema/serviceSchema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useForm, Controller } from "@/lib/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import z from "zod";

export default function AddBookings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceBooked: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof bookingSchema>) => {
    console.log(values);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <SheetContent className="">
      <SheetHeader>
        <SheetTitle>Add Booking</SheetTitle>
        <SheetDescription asChild>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>

                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>

                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Enter Email"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>

                    <Input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="Enter Phone"
                      autoComplete="phone"
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="serviceBooked"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="serviceBooked">
                      Service Booked
                    </FieldLabel>

                    <Input
                      {...field}
                      id="serviceBooked"
                      placeholder="Enter Service Booked"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      required
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="preferredDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="preferredDate">
                      Preferred Date
                    </FieldLabel>

                    <Input
                      {...field}
                      id="preferredDate"
                      type="date"
                      placeholder="Enter Preferred Date"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      required
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="preferredTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="preferredTime">
                      Preferred Time
                    </FieldLabel>

                    <Input
                      {...field}
                      id="preferredTime"
                      type="time"
                      placeholder="Enter Preferred Time"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      required
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="message">Message</FieldLabel>

                    <textarea
                      {...field}
                      id="message"
                      placeholder="Enter Message"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      required
                      rows={4}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4 animate-spin" />
                    Adding Booking
                  </>
                ) : (
                  "Add Booking"
                )}
              </Button>
            </FieldGroup>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
