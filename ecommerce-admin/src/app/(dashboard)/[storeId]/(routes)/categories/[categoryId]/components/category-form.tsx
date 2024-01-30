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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { AlertModal } from "@/components/modals/alert-modal"
import { Icons } from "@/components/icons"

import {
  categorySchema,
  CategoryInput,
} from "@/lib/validations/category"

export interface Billboard {
  id: string
  label: string
  imageUrl: string
  storeId: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  name: string
  billboardId: string
}

interface CategoryFormProps {
  initialData: Category | null
  billboards: Billboard[]
}

export const CategoryForm = ({
  initialData,
  billboards
}: CategoryFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const notBillboard = billboards.length === 0
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Editar categoria" : "Criar categoria"
  const description = initialData ? "Edite a categoria" : "Crie uma nova categoria"
  const toastMessage = initialData ? "Categoria atualizada." : "Categoria criada."
  const action = initialData ? "Salvar mudanças" : "Criar"

  const categoryForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  })

  const onSubmitUpdateOrCreateCategory = async (data: CategoryInput) => {
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data)
      }

      toast.success(toastMessage)
      router.push(`/${params.storeId}/categories`)
      router.refresh()
    } catch (error) {
      toast.error("Algo deu errado.")
    }
  }

  const onSubmitDeleteCategory = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
      toast.success("Categoria deletada.")

      router.push(`/${params.storeId}/categories`)
      router.refresh()
    } catch (error) {
      toast.error("Certifique-se de remover todos os produtos que usam essa categoria primeiro.")
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
        onConfirm={onSubmitDeleteCategory}
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
            disabled={categoryForm.formState.isSubmitting}
            onClick={() => setIsOpen(true)}
          >
            <Icons.trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...categoryForm}>
        <form
          onSubmit={categoryForm.handleSubmit(onSubmitUpdateOrCreateCategory)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={categoryForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={categoryForm.formState.isSubmitting || notBillboard}
                      placeholder="Nome da categoria"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={categoryForm.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outdoor</FormLabel>
                    <Select
                      disabled={categoryForm.formState.isSubmitting || notBillboard}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecione um outdoor"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billboards.map((billboard) => (
                          <SelectItem
                            key={billboard.id}
                            value={billboard.id}
                          >
                            {billboard.label}
                          </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    {notBillboard&& (
                      <p className="text-md text-red-500">Você precisa criar um outdoor primeiro.</p>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!notBillboard && (
            <Button
              disabled={categoryForm.formState.isSubmitting || notBillboard}
              type="submit"
            >
              {action}
            </Button>
          )}
        </form>
      </Form>
    </>
  )
}
