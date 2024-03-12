"use client"

import { CartProduct } from "./components/cart-product"
import { Summary } from "./components/summary"
import { Container } from "@/components/ui/container"
import { useCart } from "@/hooks/use-cart"
import { useMounted } from "@/hooks/use-mounted"

const CartPage = () => {
  const { mounted } = useMounted()
  const cart = useCart()

  if (!mounted) return null

  return (
    <Container>
      <div className="py-8 space-y-8">
        <h1 className="text-3xl font-bold">Carrinho de compras</h1>
        <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {cart.products.length === 0 && (
              <p className="text-foreground">Nenhum produto adicionado.</p>
            )}

            <ul>
              {cart.products.map(product => (
                <CartProduct
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
          <Summary />
        </div>
      </div>
    </Container>
  )
}

export default CartPage
