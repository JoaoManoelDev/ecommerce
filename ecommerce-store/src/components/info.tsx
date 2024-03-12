"use client"

import { Product } from "@/entities/product"
import { Icons } from "@/components/icons"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { priceFormatter } from "@/lib/formatter"
import { useCart } from "@/hooks/use-cart"

interface InfoProps {
  product: Product
}

export const Info = ({
  product
}: InfoProps) => {
  const cart = useCart()

  const onAddProduct = () => {
    cart.addProduct(product)
  }

  return (
    <section
      aria-label="Informações do produto escolhido"
      className="flex flex-col gap-y-2"
    >
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="font-semibold text-xl">
          {priceFormatter(product?.price)}
        </p>
        <Separator />
      </header>

      <div className="flex flex-col gap-y-6">
        <div
          className="flex gap-x-2 font-semibold"
          aria-label="tamanho do produto"
        >
          <h3>Tamanho:</h3> 
          <span>{product.size.name}</span>
        </div>

        <div
          className="flex gap-x-2 font-semibold"
          aria-label="cor do produto"
        >
          <h3>Cor:</h3> 
          <div
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: product.color.value }}
            />
        </div>
      </div>

      <div className="flex items-center gap-x-3 mt-8" onClick={onAddProduct}>
        <Button className="font-semibold gap-x-1" >
          <Icons.shoppingCart className="w-6 h-6" />
          <span>Adicionar</span>
        </Button>
      </div>
    </section>
  )
}
