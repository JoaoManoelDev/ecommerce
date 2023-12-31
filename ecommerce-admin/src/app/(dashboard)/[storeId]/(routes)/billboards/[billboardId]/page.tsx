import { prismadb } from "@/lib/prismadb"
import { BillboardForm } from "./components/billboard-form"

interface BillboardPageProps {
  params: {
    billboardId: string
  }
}

export default async function BillboardPage({
  params
}: BillboardPageProps) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  })

  let data = undefined

  if (billboard) {
    data = {
      label: billboard?.label,
      imageUrl: billboard?.image_url
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