import * as z from "zod"

export const newStoreSchema = z.object({
  name: z.string().min(1, "O nome da loja não pode estar vazio.")
})

export type NewStoreInput = z.infer<typeof newStoreSchema>