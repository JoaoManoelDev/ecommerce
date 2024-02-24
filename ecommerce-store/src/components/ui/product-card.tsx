"use client"

import Image from "next/image"

import { Icons } from "@/components/icons"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product } from "@/entities/product"
import { priceFormatter } from "@/lib/formatter"

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({
  product
}: ProductCardProps) => {
  console.log("MEU PRODUTO", product)

  return (
    <Card className="group relative cursor-pointer w-full">
      <Image
        src={product?.image?.[0]?.url}
        alt={`imagem do ${product.name}`}
        className="aspect-square object-cover rounded-t-md w-full"
        width={200}
        height={200}
      />

      <div
        className="flex justify-center opacity-0 group-hover:opacity-100 absolute transition bottom-6 h-fit top-2 left-2"
      >
        <Button
          size="icon"
          className="rounded-full hover:scale-110 transition"
          variant="secondary"
        >
          <Icons.expand className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-2">
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-lg font-semibold">{product.category?.name}</p>
        <div className="flex items-center">
          <p>{priceFormatter(product.price)}</p>
        </div>
      </CardContent>

      <CardFooter className="p-2">
        <Button className="flex items-center gap-2 w-full">
          <Icons.shoppingCart className="w-4 h-4" />
          <span>Adicionar</span>
        </Button>
      </CardFooter>
    </Card>
  )
}