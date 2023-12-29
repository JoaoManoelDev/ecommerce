import { z } from "zod"

export const storeBodyValidation = z.object({
  name: z.string().min(3, "The name must have at least 3 characters.")
})
