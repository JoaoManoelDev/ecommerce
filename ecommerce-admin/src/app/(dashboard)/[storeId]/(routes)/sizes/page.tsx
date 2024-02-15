import { SizeClient } from "./components/client"
import { SizeColumn } from "./components/columns"

import { dateFormatter } from "@/lib/formatter"
import { getSizesByStoreId } from "@/actions/sizes"

interface SizesPageProps {
  params: {
    storeId: string
  }
}

export default async function SizesPage({
  params
}: SizesPageProps) {
  const sizes = await getSizesByStoreId(params.storeId)

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: dateFormatter(size.created_at)
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  )
}
