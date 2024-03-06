import Image from "next/image"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product } from "@/entities/product"
import { priceFormatter } from "@/lib/formatter"

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="w-full">
      <Link href={`/product/${product.id}`} className="cursor-pointer">
        <Image
          src={product?.images?.[0]?.url}
          alt={`imagem do ${product.name}`}
          className="aspect-square object-cover rounded-t-md w-full"
          width={200}
          height={200}
        />

        <CardContent className="p-2">
          <p
            className="text-lg font-semibold text-ellipsis overflow-hidden
            text-nowrap"
          >
            {product.name}
          </p>
          <p className="text-lg font-semibold">{product.category?.name}</p>
          <div className="flex items-center">
            <p className="font-semibold">{priceFormatter(product.price)}</p>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-2">
        <Button className="flex items-center gap-2 w-full">
          <Icons.shoppingCart className="w-4 h-4" />
          <span>Adicionar</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
