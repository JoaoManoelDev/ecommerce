"use server"

import { prismadb } from "@/lib/prismadb"

interface getCategoriesByStoreIdProps {
  storeId: string,
  includes?: {
    products?: boolean
    store?: boolean
    billboard?: boolean
  }
}

export const getCategoriesByStoreId = async ({
  storeId,
  includes = {
    products: false,
    store: false,
    billboard: false
  }
}: getCategoriesByStoreIdProps) => {
  const { billboard, products, store } = includes

  const categories = await prismadb.category.findMany({
    where: {
      storeId
    },
    include: {
      billboard,
      products,
      store
    },
    orderBy: {
      createdAt: "desc"
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
