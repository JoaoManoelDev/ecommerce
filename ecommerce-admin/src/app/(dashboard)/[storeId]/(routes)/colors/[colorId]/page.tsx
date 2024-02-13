import { getColorById } from "@/actions/color"
import { ColorForm } from "./components/color-form"

interface ColorPageProps {
  params: {
    colorId: string
  }
}

export default async function ColorPage({
  params
}: ColorPageProps) {
  const color = await getColorById(params.colorId)

  let data = undefined

  if (color) {
    data = {
      name: color.name,
      value: color.value
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={data} />
      </div>
    </div>
  )
}