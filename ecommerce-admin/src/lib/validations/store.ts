import * as z from "zod"

export const storeSchema = z.object({
  name: z.string()
})

export type StoreInput = z.infer<typeof storeSchema>
