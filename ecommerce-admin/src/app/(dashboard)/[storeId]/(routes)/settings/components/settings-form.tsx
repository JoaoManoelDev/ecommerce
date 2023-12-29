"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
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
import { ApiAlert } from "@/components/ui/api-alert"
import { Icons } from "@/components/icons"

import {
  StoreInput,
  storeSchema
} from "@/lib/validations/store"
import { useOrigin } from "@/hooks/use-origin"

interface SettingsFormProps {
  initialData: Store
}

export const SettingsForm = ({
  initialData
}: SettingsFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const settingsForm = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: initialData,
  })

  const onSubmitUpdateStore = async (data: StoreInput) => {
    try {
      await axios.patch(`/api/stores/${params.storeId}`, data)
      router.refresh()
      toast.success("Loja atualizada.")
    } catch (error) {
      toast.error("Algo deu errado.")
    }
  }

  const onSubmitDeleteStore = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      toast.success("Loja Deletada.")

    } catch (error) {
      toast.error("Certifique-se de remover todos os produtos e categorias primeiro.")
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
        onConfirm={onSubmitDeleteStore}
      />

      <div className="flex items-center justify-between">
        <Heading
          title="Configurações"
          description="Gerenciar preferências da loja"
        />

        <Button
          variant="destructive"
          size="icon"
          disabled={settingsForm.formState.isSubmitting}
          onClick={() => setIsOpen(true)}
        >
          <Icons.trash className="w-4 h-4" />
        </Button>
      </div>

      <Separator />

      <Form {...settingsForm}>
        <form
          onSubmit={settingsForm.handleSubmit(onSubmitUpdateStore)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={settingsForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={settingsForm.formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={settingsForm.formState.isSubmitting}
            type="submit"
          >
            Salvar mudanças
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="admin"
      />
    </>
  )
}
