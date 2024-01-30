import { z } from "zod"

export const categoryBodyValidation = z.object({
  name: z.string().min(3, "The name must have at least 3 characters."),
  billboardId: z.string(),
})
