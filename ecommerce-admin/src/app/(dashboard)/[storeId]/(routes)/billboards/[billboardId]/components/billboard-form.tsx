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
import { ImageUpload } from "@/components/ui/image-upload"
import { AlertModal } from "@/components/modals/alert-modal"
import { Icons } from "@/components/icons"

import {
  billboardSchema,
  BillboardInput,
} from "@/lib/validations/billboard"

interface BillboardFormProps {
  initialData: BillboardInput | undefined
}

export const BillboardForm = ({
  initialData
}: BillboardFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Editar outdoor" : "Criar outdoor"
  const description = initialData ? "Edite o outdoor" : "Crie um novo outdoor"
  const toastMessage = initialData ? "Outdoor atualizado." : "Outdoor criado."
  const action = initialData ? "Salvar mudanças" : "Criar"

  const billboardForm = useForm({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: ""
    },
  })

  const onSubmitUpdateOrCreateBillboard = async (data: BillboardInput) => {
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data)
      }

      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Algo deu errado.")
    }
  }

  const onSubmitDeleteBillboard = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      router.refresh()
      toast.success("Outdoor deletado.")

    } catch (error) {
      console.log("[DELETE_BILLBOARD_ERROR]", error)
      toast.error("Certifique-se de remover todas e categorias que usam esse outdoor primeiro.")
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
        onConfirm={onSubmitDeleteBillboard}
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
            disabled={billboardForm.formState.isSubmitting}
            onClick={() => setIsOpen(true)}
          >
            <Icons.trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...billboardForm}>
        <form
          onSubmit={billboardForm.handleSubmit(onSubmitUpdateOrCreateBillboard)}
          className="space-y-8 w-full"
        >
          <FormField
            control={billboardForm.control}
            name="imageUrl"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Fundo de imagem</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={billboardForm.formState.isSubmitting}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={billboardForm.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={billboardForm.formState.isSubmitting}
                      placeholder="Título do outdoor"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={billboardForm.formState.isSubmitting}
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
