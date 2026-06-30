import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  description: z.string().trim().min(1, "Description is required"),

  website: z.string().url("Must be a valid URL").or(z.literal("")),

  avatar: z.string().url("Must be a valid URL").or(z.literal("")),
});

export type PatientFormData = z.infer<typeof patientSchema>;
