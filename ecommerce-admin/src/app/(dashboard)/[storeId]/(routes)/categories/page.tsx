import { CategoryClient } from "./components/client"
import { CategoryColumn } from "./components/columns"

import { dateFormatter } from "@/lib/formatter"
import { getCategoriesByStoreId } from "@/actions/category"

interface CategoryPageProps {
  params: {
    storeId: string
  }
}

export default async function CategoryPage({
  params
}: CategoryPageProps) {
  const categories = await getCategoriesByStoreId({
    storeId: params.storeId,
    includes: {
      billboard: true
    }
  })

  const clientFormattedCategories = categories.map<CategoryColumn>((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: dateFormatter(category.createdAt),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={clientFormattedCategories} />
      </div>
    </div>
  )
}
