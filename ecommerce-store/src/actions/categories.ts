import { Category } from "@/entities/category"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(URL)

  return response.json()
}