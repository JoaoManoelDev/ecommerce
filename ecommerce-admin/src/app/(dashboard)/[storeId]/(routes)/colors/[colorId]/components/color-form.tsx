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
  colorSchema,
  ColorInput,
} from "@/lib/validations/color"

interface ColorFormProps {
  initialData: ColorInput | undefined
}

export const ColorForm = ({
  initialData
}: ColorFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Editar cor" : "Criar cor"
  const description = initialData ? "Edite a cor" : "Crie uma nova cor"
  const toastMessage = initialData ? "Cor atualizada." : "Cor criada."
  const action = initialData ? "Salvar mudanças" : "Criar"

  const colorForm = useForm({
    resolver: zodResolver(colorSchema),
    defaultValues: initialData || {
      name: "",
      value: "#"
    },
  })

  const onSubmitUpdateOrCreateColor = async (data: ColorInput) => {
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data)
      }

      toast.success(toastMessage)
      router.push(`/${params.storeId}/colors`)
      router.refresh()
    } catch (error) {
      toast.error("Algo deu errado.")
    }
  }

  const onSubmitDeleteColor = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
      toast.success("Tamanho deletado.")

      router.push(`/${params.storeId}/colors`)
      router.refresh()
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

      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />

        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={colorForm.formState.isSubmitting}
            onClick={() => setIsOpen(true)}
          >
            <Icons.trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...colorForm}>
        <form
          onSubmit={colorForm.handleSubmit(onSubmitUpdateOrCreateColor)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={colorForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={colorForm.formState.isSubmitting}
                      placeholder="Nome da cor"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={colorForm.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        {...field}
                        disabled={colorForm.formState.isSubmitting}
                        placeholder="Valor da cor"
                      />
                      <div
                        className="p-4 rounded-full border border-muted-foreground"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={colorForm.formState.isSubmitting}
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
