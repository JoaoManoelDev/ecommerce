import * as z from "zod"

export const billboardSchema = z.object({
  label: z.string(),
  imageUrl: z.string()
})

export type BillboardInput = z.infer<typeof billboardSchema>