import { z } from "zod"

export const colorBodyValidation = z.object({
  name: z.string().min(1, "The name must have at least 1 characters."),
  value: z
    .string()
    .regex(/^#/, { message: "The value must be a valid hexadecimal." })
    .min(4, "The value must have at least 4 characters")
    .max(7, "The value must have a maximum of 7 characters."),
})
