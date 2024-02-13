import * as z from "zod"

export const colorSchema = z.object({
  name: z.string().min(1, "O nome deve ter no mínimo 1 caractere."),
  value: z
    .string()
    .regex(/^#/, { message: "O valor deve ser um hexadecimal válido." })
    .min(4, "O valor deve ter no mínimo 4 caracteres")
    .max(7, "O valor deve ter no máximo 7 dígitos."),
})

export type ColorInput = z.infer<typeof colorSchema>
