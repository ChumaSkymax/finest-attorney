"use client";

import { signUpSchema } from "@/app/schema/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { useForm, Controller } from "@/lib/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { ArrowLeft, CircleIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import z from "zod";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const setUserRole = useMutation(api.users.setUserRole);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Called when the user submits the form, after passing all Zod validations
  async function onSubmit(formData: z.infer<typeof signUpSchema>) {
    // 1. We don't need to send the confirmPassword field to the backend
    const { confirmPassword, ...userData } = formData;

    try {
      setSubmitting(true);
      // 2. We use the Better Auth client to create a new user account
      // It returns both a 'data' and 'error' object.
      const { data, error } = await authClient.signUp.email({
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        password: userData.password,
      });

      // 3. Handle specific authentication errors (e.g., email already taken, password too short)
      if (error) {
        toast.error(error.message || "Sign Up Failed");
        setSubmitting(false);
        return; // Exit early so we don't proceed with user creation
      }

      console.log("Better Auth Response Data:", data);

      // 4. Safely extract the generated unique user ID from Better Auth
      const userId = data?.user?.id;

      if (!userId) {
        toast.error("User creation failed, could not retrieve user ID");
        setSubmitting(false);
        return; // Exit if the ID somehow didn't generate correctly
      }

      // 5. Send the new user details, including the generated ID, over to our Convex database manually
      //    so we can link our BetterAuth accounts with our Convex data layer
      const result = await setUserRole({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: "user", // Automatically assign new signups with the normal 'user' role
        userId: userId, // Link the ID here
      });

      // 6. Give the user visual feedback if everything worked out
      if (result) {
        toast.success("Sign Up Successful");
        router.push("/");
      }

      console.log("Convex Mutation Result:", result);
    } catch (error: any) {
      // 7. Catch any unexpected or network issues
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link
          href="/"
          className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-1 mb-4">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-sm">
            Enter your details to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Full Name Field */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Phone Number  */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-phone">Phone</FieldLabel>
                    <Input
                      {...field}
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        aria-invalid={fieldState.invalid}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-0 h-full flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Confirm Password Field */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-confirm-password">
                      Confirm Password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id="signup-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        aria-invalid={fieldState.invalid}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-0 h-full flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {submitting ? (
                <div className="flex items-center gap-2 justify-center">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Signing Up...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-row justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
