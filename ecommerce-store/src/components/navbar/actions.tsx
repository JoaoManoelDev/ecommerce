"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useMounted } from "@/hooks/use-mounted"

export const NavbarActions = () => {
  const { mounted } = useMounted()

  if (!mounted) return null

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button className="flex items-center rounded-full">
        <Icons.shoppingBag className="w-5 h-5" />
        <span className="ml-2 text-sm font-medium">0</span>
      </Button>
    </div>
  )
}
