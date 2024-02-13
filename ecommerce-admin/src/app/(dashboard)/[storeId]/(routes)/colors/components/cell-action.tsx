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
import { ColorColumn } from "./columns"

interface CellActionProps {
  data: ColorColumn
}

export const CellAction = ({
  data
}: CellActionProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const params = useParams()

  const onCopyColorId = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("ID da cor copiado.")
  }

  const onSubmitDeleteColor = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
      router.refresh()
      toast.success("Cor deletada.")

    } catch (error) {
      toast.error("Certifique-se de remover todos os produtos que usam essa cor primeiro.")
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
        onConfirm={onSubmitDeleteColor}
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
            onClick={() => onCopyColorId(data.id)}
          >
            <Icons.copy className="w-4 h-4" />
            <span>Copiar ID</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
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
