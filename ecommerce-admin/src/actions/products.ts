import { prismadb } from "@/lib/prismadb"

interface GetProductByStoreIdProps {
  storeId: string
  includes?: {
    category: boolean
    color: boolean
    size: boolean
  }
}

export const getProductByStoreId = async ({
  storeId,
  includes = {
    category: false,
    color: false,
    size: false
  }
}: GetProductByStoreIdProps) => {
  const { category, color, size } = includes

  const products = await prismadb.product.findMany({
    where: {
      store_id: storeId
    },
    include: {
      category,
      color,
      size
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return products
}

interface getProductByIdProps {
  productId: string
  includes?: {
    image?: boolean
  }
}

export const getProductById = async ({
  productId,
  includes = {
    image: false,

  }
}: getProductByIdProps) => {
  const { image } = includes

  const product = await prismadb.product.findUnique({
    where: {
      id: productId
    },
    include: {
      image
    },
  })

  return product
}