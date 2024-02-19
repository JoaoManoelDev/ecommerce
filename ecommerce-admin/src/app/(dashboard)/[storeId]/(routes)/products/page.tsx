import { ProductClient } from "./components/client"
import { ProductColumn } from "./components/columns"

import { dateFormatter, priceFormatter } from "@/lib/formatter"
import { getProductByStoreId } from "@/actions/products"

interface ProductsPageProps {
  params: {
    storeId: string
  }
}

export default async function ProductsPage({
  params
}: ProductsPageProps) {
  const products = await getProductByStoreId({
    storeId: params.storeId,
    includes: {
      category: true,
      color: true,
      size: true
    }
  })

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeature: product.is_feature,
    isArchived: product.is_archived,
    price: priceFormatter(product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: dateFormatter(product.created_at)
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}
