"use client"

import { useSearchParams, useRouter} from "next/navigation"
import qs from "query-string"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Color } from "@/entities/color"
import { Size } from "@/entities/size"
import { cn } from "@/lib/utils"

interface FilterProps {
  valueKey: string
  name: string
  data: (Size | Color)[]
}

export const Filter = ({
  data,
  name,
  valueKey
}: FilterProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectValue = searchParams.get(valueKey)

  const onAddFilter = (id: string) => {
    const currentFilter = qs.parse(searchParams.toString())
    
    const query = {
      ...currentFilter,
      [valueKey]: id
    }

    if (currentFilter[valueKey] === id) {
      query[valueKey] = null
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true })

    router.push(url)
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        {name}
      </h3>

      <Separator className="my-2" />

      <div className="flex flex-wrap gap-2">
        {data.map(filter => (
          <div key={filter.id} className="flex items-center">
            <Button 
              variant="outline"
              className={cn(selectValue === filter.id && "bg-primary")}
              onClick={() => onAddFilter(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}