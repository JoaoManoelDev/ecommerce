import { ColorClient } from "./components/client"
import { ColorColumn } from "./components/columns"

import { dateFormatter } from "@/lib/formatter"
import { getColorsByStoreId } from "@/actions/color"

interface ColorsPageProps {
  params: {
    storeId: string
  }
}

export default async function ColorsPage({
  params
}: ColorsPageProps) {
  const colors = await getColorsByStoreId(params.storeId)

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: dateFormatter(color.createdAt)
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}
