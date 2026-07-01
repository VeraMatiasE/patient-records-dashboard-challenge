import { z } from "zod";

const httpUrlSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();

    if (trimmed === "") return "";

    if (/^[a-z][a-z\d+\-.]*:\/\//i.test(trimmed)) {
      return trimmed;
    }

    return `https://${trimmed}`;
  },
  z.union([
    z.literal(""),
    z.url({
      protocol: /^https?$/,
      error: "Must be a valid HTTP or HTTPS URL",
    }),
  ]),
);

export const patientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  description: z.string().trim().min(1, "Description is required"),

  website: httpUrlSchema,

  avatar: httpUrlSchema,
});

export type PatientFormData = z.infer<typeof patientSchema>;
