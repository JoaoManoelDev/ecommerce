"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const colorColumns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div
          className="w-6 h-6 rounded-full border border-muted-foreground"
          style={{ backgroundColor: row.original.value }}
          />
        {row.original.value}
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
