import { z } from "zod";

export const httpUrlSchema = z.union([
  z.literal(""),
  z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: "Must be a valid HTTP or HTTPS URL",
    normalize: true,
  }),
]);

export const patientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  description: z.string().trim().min(1, "Description is required"),

  website: httpUrlSchema,

  avatar: httpUrlSchema,
});

export type PatientFormData = z.infer<typeof patientSchema>;
