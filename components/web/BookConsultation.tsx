"use client";

import { useConsultationModal } from "@/context/ConsultationModalContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { Input } from "../ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import z from "zod";
import { useState } from "react";
import { bookingSchema } from "@/app/schema/bookingsSchema";

export default function BookConsultation() {
  const { isOpen, closeModal } = useConsultationModal();

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
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 transition-all duration-300"
      style={{ zIndex: 9999 }}
    >
      <Card className="max-w-2xl w-full mx-auto relative max-h-[90vh] overflow-y-auto ">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={closeModal}
          className="absolute right-4 top-4 hover:bg-muted rounded-full"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        <CardHeader className="mt-10">
          {/* <CardTitle>Book a Legal Consultation</CardTitle> */}
          {/* <CardDescription>
            Schedule a consultation with our experienced attorneys to discuss
            your legal matter.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name" className="text-sm">
                      Name
                    </FieldLabel>

                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                      required
                      className="text-sm"
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
                      placeholder="What legal service do you need?"
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
            </div>

            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>

                  <textarea
                    {...field}
                    id="message"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                "Book Consultation"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
