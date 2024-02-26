import qs from "query-string"

import { Product } from "@/entities/product"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export const getProducts = async (query?: Query):Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query?.categoryId,
      colorId: query?.colorId,
      sizeId: query?.sizeId,
      isFeatured: query?.isFeatured,
    }
  })

  const response = await fetch(url)

  const products: Product[] | [] = await response.json()

  const formattedProducts = products.map(product => ({
    ...product,
    price: product.price / 100
  }))

  return formattedProducts
}

export const getProduct = async (productId: string):Promise<Product> => {
  const response = await fetch(`${URL}/${productId}`)

  const product: Product = await response.json()
  
  return {
    ...product,
    price: product.price / 100
  }
}
