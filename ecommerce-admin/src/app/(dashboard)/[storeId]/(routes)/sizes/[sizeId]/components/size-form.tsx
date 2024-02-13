"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { AlertModal } from "@/components/modals/alert-modal"
import { Icons } from "@/components/icons"

import {
  sizeSchema,
  SizeInput,
} from "@/lib/validations/size"

interface SizeFormProps {
  initialData: SizeInput | undefined
}

export const SizeForm = ({
  initialData
}: SizeFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Editar tamanho" : "Criar tamanho"
  const description = initialData ? "Edite o tamanho" : "Crie um novo tamanho"
  const toastMessage = initialData ? "Tamanho atualizado." : "Tamanho criado."
  const action = initialData ? "Salvar mudanças" : "Criar"

  const sizeForm = useForm({
    resolver: zodResolver(sizeSchema),
    defaultValues: initialData || {
      name: "",
      value: ""
    },
  })

  const onSubmitUpdateOrCreateSize = async (data: SizeInput) => {
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data)
      }

      toast.success(toastMessage)
      router.push(`/${params.storeId}/sizes`)
      router.refresh()
    } catch (error) {
      toast.error("Algo deu errado.")
    }
  }

  const onSubmitDeleteSize = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      toast.success("Tamanho deletado.")

      router.push(`/${params.storeId}/sizes`)
      router.refresh()
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

      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />

        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={sizeForm.formState.isSubmitting}
            onClick={() => setIsOpen(true)}
          >
            <Icons.trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...sizeForm}>
        <form
          onSubmit={sizeForm.handleSubmit(onSubmitUpdateOrCreateSize)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={sizeForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={sizeForm.formState.isSubmitting}
                      placeholder="Nome do tamanho"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={sizeForm.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={sizeForm.formState.isSubmitting}
                      placeholder="Valor do tamanho"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={sizeForm.formState.isSubmitting}
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
