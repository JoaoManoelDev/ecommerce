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

  const productsFormatted = products.map(product => ({
    ...product,
    price: product.price / 100
  }))

  return productsFormatted
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

  if (!product) return null

  return {
    ...product,
    price: product.price / 100
  }
}