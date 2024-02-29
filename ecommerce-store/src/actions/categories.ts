import { Category } from "@/entities/category"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(URL)

  return response.json()
}

interface GetCategoryProps {
  categoryId: string
  include?: string[]
}

export const getCategory = async ({ categoryId, include }: GetCategoryProps): Promise<Category> => {
  const response = await fetch(`${URL}/${categoryId}?include=${[include]}`)

  return response.json()
}
