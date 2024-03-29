"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

import { OrderColumn, orderColumns } from "./columns"

interface OrderClientProps {
  data: OrderColumn[]
}

export const OrderClient = ({
  data
}: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Pedidos (${data.length})`}
        description="Gerenciar pedidos da sua loja"
      />


      <Separator />

      <DataTable searchKey="products" columns={orderColumns} data={data} />

    </>
  )
}
