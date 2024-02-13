"use client"

import { useParams, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

import { ColorColumn, colorColumns } from "./columns"

interface ColorClientProps {
  data: ColorColumn[]
}

export const ColorClient = ({
  data
}: ColorClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Cores (${data.length})`}
          description="Gerenciar cores para sua loja"
        />

        <Button
          className="gap-2"
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Icons.plus className="w-4 h-4" />
          <span>Adicionar</span>
        </Button>
      </div>

      <Separator />
      
      <DataTable searchKey="name" columns={colorColumns} data={data} />

      <Heading
        title="API" description="Chamadas de API para cores"
      />

      <Separator />

      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}
