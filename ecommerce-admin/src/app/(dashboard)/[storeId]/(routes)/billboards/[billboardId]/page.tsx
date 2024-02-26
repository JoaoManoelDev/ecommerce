import { BillboardForm } from "./components/billboard-form"
import { getBillboardById } from "@/actions/billboard"

interface BillboardPageProps {
  params: {
    billboardId: string
  }
}

export default async function BillboardPage({
  params
}: BillboardPageProps) {
  const billboard = await getBillboardById(params.billboardId)

  let data = undefined

  if (billboard) {
    data = {
      label: billboard?.label,
      imageUrl: billboard?.imageUrl
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={data} />
      </div>
    </div>
  )
}