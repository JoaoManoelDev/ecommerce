import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns"

import { prismadb } from "@/lib/prismadb"
import { dateFormatter } from "@/lib/formatter"

interface BillboardsPageProps {
  params: {
    storeId: string
  }
}

export default async function BillboardsPage({
  params
}: BillboardsPageProps) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      store_id: params.storeId
    },
    orderBy: {
      created_at: "desc"
    }
  })

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: dateFormatter(billboard.created_at)
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}
