import { z } from "zod"

export const sizeBodyValidation = z.object({
  name: z.string().min(1, "The name must have at least 1 characters."),
  value: z.string()
})
