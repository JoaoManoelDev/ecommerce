"use client"

import { Modal } from "@/components/ui/modal"
import { useStoreModalStore } from "@/stores/store-modal-store"

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModalStore()

  return (
    <Modal
      title="Criar Loja"
      description="Crie uma loja para gerenciar produtos e categorias."
      isOpen={isOpen}
      onClose={onClose}
    >
      Futuro formulário para criação de lojas
    </Modal>
  )
}
