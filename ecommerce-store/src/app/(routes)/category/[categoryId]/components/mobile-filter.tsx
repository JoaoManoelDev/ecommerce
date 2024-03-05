"use client"

import { Color } from "@/entities/color"
import { Size } from "@/entities/size"
import { Filter } from "./filter"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface MobileFilterProps {
  sizes: Size[]
  colors: Color[]
}

export const MobileFilter = ({
  colors,
  sizes
}: MobileFilterProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="lg:hidden flex items-center gap-x-2">
            <Icons.plus className="w-5 h-5" />
            <span>Filtros</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecione os filtros</DialogTitle>
            
            <div>
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />

              <Filter
                valueKey="colorId"
                name="Cores"
                data={colors}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
