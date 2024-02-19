import { z } from "zod"

export const productBodyValidation = z.object({
  name: z.string().min(3, "The name must have at least 3 characters."),
  images: z.object({ url: z.string() }).array().min(1, "You need at least one image."),
  price: z.coerce.number().min(1, "The price cannot be empty."),
  categoryId: z.string().min(1, "The category ID must not be empty."),
  sizeId: z.string().min(1, "The size ID must not be empty."),
  colorId: z.string().min(1, "The color ID cannot be empty."),
  isFeature: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})
