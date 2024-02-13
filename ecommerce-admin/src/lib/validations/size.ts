import * as z from "zod"

export const sizeSchema = z.object({
  name: z.string(),
  value: z.string(),
})

export type SizeInput = z.infer<typeof sizeSchema>