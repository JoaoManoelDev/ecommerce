"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { priceFormatter } from "@/lib/formatter"

export const Summary = () => {
  const { products, removeAllProducts } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pagamento concluído")
      removeAllProducts()
    }

    if (searchParams.get("canceled")) {
      toast.error("Algo deu errado, tente novamente.")
      removeAllProducts()
    }
  }, [searchParams, removeAllProducts])

  const totalPrice = products.reduce((total, product) => {
    return total + product.price
  }, 0)

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: products.map((product) => product.id)
    })

    window.location = response.data.url
  }


  return (
    <Card className="col-span-5">
      <CardHeader>
        <CardTitle>Resumo do pedido</CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col items-start gap-2">
        <div
          className="flex justify-between items-center w-full font-semibold text-lg"
        >
          <p>Resumo total</p>
          <span>{priceFormatter(totalPrice)}</span>
        </div>

        <Button onClick={onCheckout} className="w-full">Finalizar</Button>
      </CardContent>
    </Card>
  )
}
