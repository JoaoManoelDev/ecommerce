"use server"

import { prismadb } from "@/lib/prismadb"

export const getCategoriesByStoreId = async (storeId: string) => {
  const categories = await prismadb.category.findMany({
    where: {
      store_id: storeId
    },
    include: {
      billboard: true
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return categories
}

export const getCategoryById = async (categoryId: string) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId
    }
  })

  return category
}
