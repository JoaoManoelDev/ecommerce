import { Billboard as BillboardType } from "@/entities/billboard"

interface BillboardProps {
  data: BillboardType
}

export const Billboard = ({
  data
}: BillboardProps) => {
  return (
    <div className="py-4 sm:py-6 lg:py-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[4.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      >
        <div className="w-full h-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            <p className="text-secondary">{data.label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
