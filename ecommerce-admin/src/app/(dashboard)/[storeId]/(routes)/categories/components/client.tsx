"use client"

import { useParams, useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

import { CategoryColumn, categoryColumns } from "./columns"

interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient = ({
  data
}: CategoryClientProps) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categorias (${data.length})`}
          description="Gerenciar categorias para sua loja"
        />

        <Button
          className="gap-2"
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Icons.plus className="w-4 h-4" />
          <span>Adicionar</span>
        </Button>
      </div>

      <Separator />
      
      <DataTable searchKey="name" columns={categoryColumns} data={data} />

      <Heading
        title="API" description="Chamadas de API para categorias"
      />

      <Separator />

      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}
