import { z } from "zod"

export const billboardBodyValidation = z.object({
  label: z.string().min(1, "The label cannot be empty."),
  imageUrl: z.string().min(1, "The image URL cannot be empty.")
})
