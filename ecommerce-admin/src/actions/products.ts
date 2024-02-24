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
      storeId
    },
    include: {
      category,
      color,
      size
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return products
}

interface GetProductByIdProps {
  productId: string
  includes?: {
    images?: boolean
  }
}

export const getProductById = async ({
  productId,
  includes = {
    images: false,

  }
}: GetProductByIdProps) => {
  const { images } = includes

  const product = await prismadb.product.findUnique({
    where: {
      id: productId
    },
    include: {
      images
    },
  })

  return product
}