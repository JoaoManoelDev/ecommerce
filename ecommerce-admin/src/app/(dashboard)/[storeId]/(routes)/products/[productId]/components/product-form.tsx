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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"
import { AlertModal } from "@/components/modals/alert-modal"
import { Icons } from "@/components/icons"

import {
  productSchema,
  ProductInput,
} from "@/lib/validations/product"

export interface Category {
  id: string
  name: string
}
export interface Size {
  id: string
  name: string
}
export interface Color {
  id: string
  name: string
}

interface ProductFormProps {
  initialData: ProductInput | undefined
  categories: Category[]
  sizes: Size[]
  colors: Color[]
}

export const ProductForm = ({
  initialData,
  categories,
  sizes,
  colors
}: ProductFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? "Editar produto" : "Criar produto"
  const description = initialData ? "Edite o produto" : "Crie um novo produto"
  const toastMessage = initialData ? "Produto atualizado." : "Produto criado."
  const action = initialData ? "Salvar mudanças" : "Criar"

  const productForm = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      categoryId: "",
      colorId: "",
      sizeId: "",
      isArchived: false,
      isFeature: false,
      images: []
    },
  })

  const onSubmitUpdateOrCreateProduct = async (data: ProductInput) => {
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/products`, data)
      }

      toast.success(toastMessage)
      router.push(`/${params.storeId}/products`)
      router.refresh()
    } catch (error) {
      toast.error("Algo deu errado.")
    }
  }

  const onSubmitDeleteProduct = async () => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      toast.success("Produto deletado.")

      router.push(`/${params.storeId}/products`)
      router.refresh()
    } catch (error) {
      toast.error("Algo deu errado.")
    } finally {
      setIsDeleting(false)
      setIsOpen(false)
    }
  }
  console.log("Cheguei")
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        loading={isDeleting}
        onClose={() => setIsOpen(false)}
        onConfirm={onSubmitDeleteProduct}
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
            disabled={productForm.formState.isSubmitting}
            onClick={() => setIsOpen(true)}
          >
            <Icons.trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...productForm}>
        <form
          onSubmit={productForm.handleSubmit(onSubmitUpdateOrCreateProduct)}
          className="space-y-8 w-full"
        >
          <FormField
            control={productForm.control}
            name="images"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Imagens</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map(image => image.url)}
                      disabled={productForm.formState.isSubmitting}
                      onChange={(url) => field.onChange([...field.value, { url }])}
                      onRemove={(url) => field.onChange([...field.value.filter(current => current.url !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={productForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={productForm.formState.isSubmitting}
                      placeholder="Nome do produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={productForm.formState.isSubmitting}
                      placeholder="9,99"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    disabled={productForm.formState.isSubmitting}
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
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho</FormLabel>
                  <Select
                    disabled={productForm.formState.isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecione um tamanho"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes?.map((size) => (
                        <SelectItem
                          key={size.id}
                          value={size.id}
                        >
                          {size.name}
                        </SelectItem>
                      )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <Select
                    disabled={productForm.formState.isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecione uma cor"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors?.map((color) => (
                        <SelectItem
                          key={color.id}
                          value={color.id}
                        >
                          {color.name}
                        </SelectItem>
                      )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="isFeature"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Em destaque</FormLabel>
                    <FormDescription>
                      Este produto aparecerá na página inicial
                    </FormDescription>

                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Arquivado</FormLabel>
                    <FormDescription>
                      Este produto não aparecerá na loja
                    </FormDescription>

                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={productForm.formState.isSubmitting}
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
