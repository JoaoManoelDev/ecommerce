"use client"

import { useParams, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

import { BillboardColumn, billboardColumns } from "./columns"

interface BillboardClientProps {
  data: BillboardColumn[]
}

export const BillboardClient = ({
  data
}: BillboardClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Outdoors (${data.length})`}
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
      
      <DataTable searchKey="label" columns={billboardColumns} data={data} />
    </>
  )
}
