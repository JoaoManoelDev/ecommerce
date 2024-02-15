"use client"

import { useParams, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

import { ProductColumn, productColumns } from "./columns"

interface ProductClientProps {
  data: ProductColumn[]
}

export const ProductClient = ({
  data
}: ProductClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Produtos (${data.length})`}
          description="Gerenciar produtos para sua loja"
        />

        <Button
          className="gap-2"
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Icons.plus className="w-4 h-4" />
          <span>Adicionar</span>
        </Button>
      </div>

      <Separator />
      
      <DataTable searchKey="label" columns={productColumns} data={data} />

      <Heading
        title="API" description="Chamadas de API para produtos"
      />

      <Separator />

      <ApiList entityName="products" entityIdName="productId" />
    </>
  )
}
