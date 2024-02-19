"use server"

import { prismadb } from "@/lib/prismadb"

interface getCategoriesByStoreIdProps {
  storeId: string,
  includes?: {
    product?: boolean
    store?: boolean
    billboard?: boolean
  }
}

export const getCategoriesByStoreId = async ({
  storeId,
  includes = {
    product: false,
    store: false,
    billboard: false
  }
}: getCategoriesByStoreIdProps) => {
  const { billboard, product, store } = includes

  const categories = await prismadb.category.findMany({
    where: {
      store_id: storeId
    },
    include: {
      billboard,
      product,
      store
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
