"use client"

import Image from "next/image"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/entities/product"
import { priceFormatter } from "@/lib/formatter"
import { useCart } from "@/hooks/use-cart"

interface CartProductProps {
  product: Product
}

export const CartProduct = ({
  product
}: CartProductProps) => {
  const cart = useCart()

  const onRemoveProduct = () => cart.removeProduct(product.id)

  return (
    <li className="flex py-6 border-b">
      <div
        className="relative w-24 h-24 rounded-md overflow-hidden sm:w-48 sm:h-48"
      >
        <Image
          fill
          src={product.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>

      <div
        className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6"
      >
        <div className="absolute z-10 right-0 top-0">
          <Button
            size="icon"
            onClick={onRemoveProduct}
            variant="outline"
            className="w-6 h-6 rounded-full"
          >
          <Icons.x className="w-3 h-3" />   
          </Button>
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">
              {product.name}
            </p>
          </div>

          <div className="text-sm flex mt-1 gap-x-3">
            <div
              className="w-5 h-5 rounded-full border border-muted-foreground"
              style={{ backgroundColor: product.color.value }}
            />
            <p>{product.color?.name}</p>
            <Separator orientation="vertical" />
            <p>{product.size?.name}</p>
          </div>

          <p className="font-semibold text-xl">
            {priceFormatter(product?.price)}
          </p>
        </div>
      </div>
    </li>
  )
}
