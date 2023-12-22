import * as z from "zod"

export const newStoreSchema = z.object({
  name: z.string().min(1, "O nome da loja não pode estar vazio.")
})

export type NewStoreInput = z.infer<typeof newStoreSchema>

export const updateStoreSettingsSchema = z.object({
  name: z.string().min(1, "O nome não pode estar vazio")
})

export type UpdateStoreSettingsInput = z.infer<typeof updateStoreSettingsSchema>
