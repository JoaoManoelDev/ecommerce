"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SizeColumn } from "./columns"

interface CellActionProps {
  data: SizeColumn
}

export const CellAction = ({
  data
}: CellActionProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const params = useParams()

  const onCopySizeId = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("ID do tamanho copiado.")
  }

  const onSubmitDeleteSize = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
      router.refresh()
      toast.success("Tamanho deletado.")

    } catch (error) {
      toast.error("Certifique-se de remover todos os produtos que usam esse tamanho primeiro.")
    } finally {
      setIsDeleting(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        loading={isDeleting}
        onClose={() => setIsOpen(false)}
        onConfirm={onSubmitDeleteSize}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <Icons.moreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onCopySizeId(data.id)}
          >
            <Icons.copy className="w-4 h-4" />
            <span>Copiar ID</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
          >
            <Icons.edit className="w-4 h-4" />
            <span>Editar</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Icons.trash className="w-4 h-4" />
            <span>Deletar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
