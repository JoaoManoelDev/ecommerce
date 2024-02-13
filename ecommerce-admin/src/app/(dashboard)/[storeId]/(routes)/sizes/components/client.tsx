"use client"

import { useParams, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

import { SizeColumn, sizeColumns } from "./columns"

interface SizeClientProps {
  data: SizeColumn[]
}

export const SizeClient = ({
  data
}: SizeClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tamanhos (${data.length})`}
          description="Gerenciar tamanhos para sua loja"
        />

        <Button
          className="gap-2"
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Icons.plus className="w-4 h-4" />
          <span>Adicionar</span>
        </Button>
      </div>

      <Separator />
      
      <DataTable searchKey="name" columns={sizeColumns} data={data} />

      <Heading
        title="API" description="Chamadas de API para tamanhos"
      />

      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  )
}
