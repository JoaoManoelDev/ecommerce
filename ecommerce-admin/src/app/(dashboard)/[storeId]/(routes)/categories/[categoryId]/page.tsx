import {
  CategoryForm,
  type Billboard,
} from "./components/category-form"

import { getCategoryById } from "@/actions/category"
import { getBillboardsByStoreId } from "@/actions/billboard"

interface CategoryPageProps {
  params: {
    categoryId: string
    storeId: string
  }
}

export default async function CategoryPageWithId({
  params
}: CategoryPageProps) {
  const category = await getCategoryById(params.categoryId)

  const initialData = category ? {
    name: category.name,
    billboardId: category.billboard_id
  } : null

  const billboards = await getBillboardsByStoreId(params.storeId)

  const billboardsFormatted = billboards.map<Billboard>((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    imageUrl: billboard.image_url,
    storeId: billboard.store_id,
    createdAt: billboard.created_at,
    updatedAt: billboard.updated_at
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialData={initialData}
          billboards={billboardsFormatted}
        />
      </div>
    </div>
  )
}
