"use client"

import { useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useMounted } from "@/hooks/use-mounted"
import { useCart } from "@/hooks/use-cart"

export const NavbarActions = () => {
  const { mounted } = useMounted()
  const cart = useCart()
  const router = useRouter()

  if (!mounted) return null

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full"
      >
        <Icons.shoppingBag className="w-5 h-5" />
        <span className="ml-2 text-sm font-medium">{cart.products.length}</span>
      </Button>
    </div>
  )
}
