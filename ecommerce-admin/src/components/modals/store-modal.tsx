"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import axios from "axios"

import { Modal } from "@/components/ui/modal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useStoreModalStore } from "@/stores/store-modal-store"
import { StoreInput, storeSchema } from "@/lib/validations/store"

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModalStore()

  const newStoreForm = useForm<StoreInput>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = async (data: StoreInput) => {
    try {
      const response = await axios.post("/api/stores", data)
      
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      console.log("[CREATE_STORE_MODAL]", error)
      toast.error("Algo deu errado.")
    }
  }

  return (
    <Modal
      title="Criar Loja"
      description="Crie uma loja para gerenciar produtos e categorias."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...newStoreForm}>
          <form onSubmit={newStoreForm.handleSubmit(onSubmit)}>
            <FormField
              control={newStoreForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={newStoreForm.formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={newStoreForm.formState.isSubmitting}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={newStoreForm.formState.isSubmitting}
              >
                Criar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
