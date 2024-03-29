import { ProductForm } from "./components/product-form"

import { getCategoriesByStoreId } from "@/actions/category"
import { getSizesByStoreId } from "@/actions/sizes"
import { getColorsByStoreId } from "@/actions/color"
import { getProductById } from "@/actions/products"
import { ProductInput } from "@/lib/validations/product"

interface ProductsPageProps {
  params: {
    productId: string
    storeId: string
  }
}

export default async function ProductPage({
  params
}: ProductsPageProps) {

  const product = await getProductById({
    productId: params.productId,
    includes: {
      images: true
    }
  })

  let data = undefined

  if (product) {
    data = {
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      colorId: product.colorId,
      sizeId: product.sizeId,
      isArchived: product.isArchived,
      isFeatured: product.isFeatured,
      images: product.images.map(image => ({ url: image.url }))
    } as ProductInput
  }

  const categories = await getCategoriesByStoreId({ storeId: params.storeId })
  const sizes = await getSizesByStoreId(params.storeId)
  const colors = await getColorsByStoreId(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={data}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  )
}