import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns"

import { dateFormatter } from "@/lib/formatter"
import { getBillboardsByStoreId } from "@/actions/billboard"

interface BillboardsPageProps {
  params: {
    storeId: string
  }
}

export default async function BillboardsPage({
  params
}: BillboardsPageProps) {
  const billboards = await getBillboardsByStoreId(params.storeId)

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: dateFormatter(billboard.createdAt)
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}
