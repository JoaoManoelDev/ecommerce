import * as z from "zod"

export const productSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1, "O preço não pode estar vazio."),
  categoryId: z.string().min(1, "O ID da categoria não pode estar vazio."),
  sizeId: z.string().min(1, "O ID do tamanho não pode estar vazio."),
  colorId: z.string().min(1, "O ID da cor não pode estar vazio."),
  isFeature: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})

export type ProductInput = z.infer<typeof productSchema>