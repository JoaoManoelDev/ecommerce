"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string
  isFeatured: boolean,
  isArchived: boolean,
  price: string,
  category: string,
  size: string,
  color: string,
  createdAt: string
}

export const productColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "isArchived",
    header: "Arquivado",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isArchived ? "Sim" : "não"}
      </div>
    )
  },
  {
    accessorKey: "isFeature",
    header: "Em destaque",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.isFeatured ? "Sim" : "não"}
      </div>
    )
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "size",
    header: "Tamanho",
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div
          className="w-6 h-6 rounded-full border border-muted-foreground"
          style={{ backgroundColor: row.original.color }}
        />
        {row.original.color}
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
