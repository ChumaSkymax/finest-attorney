"use client";

// Re-export react-hook-form through this file to ensure Turbopack
// can correctly resolve named exports in Next.js App Router.
export { useForm, Controller } from "react-hook-form";
export type {
  ControllerProps,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
