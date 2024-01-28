import * as z from "zod"

export const categorySchema = z.object({
  name: z.string(),
  billboardId: z.string(),
})

export type CategoryInput = z.infer<typeof categorySchema>