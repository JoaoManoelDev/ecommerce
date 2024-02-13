import { getSizeById } from "@/actions/sizes"
import { SizeForm } from "./components/size-form"

interface SizePageProps {
  params: {
    sizeId: string
  }
}

export default async function SizePage({
  params
}: SizePageProps) {
  const size = await getSizeById(params.sizeId)

  let data = undefined

  if (size) {
    data = {
      name: size.name,
      value: size.value
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={data} />
      </div>
    </div>
  )
}