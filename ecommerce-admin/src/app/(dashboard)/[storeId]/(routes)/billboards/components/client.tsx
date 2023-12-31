"use client"

import { useParams, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const BillboardClient = () => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Outdoors (0)"
          description="Gerenciar outdoors para sua loja"
        />

        <Button
          className="gap-2"
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Icons.plus className="w-4 h-4" />
          <span>Adicionar</span>
        </Button>
      </div>

      <Separator />
    </>
  )
}