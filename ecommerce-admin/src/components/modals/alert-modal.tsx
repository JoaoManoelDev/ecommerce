"use client"

import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { useMounted } from "@/hooks/use-mounted"

interface AlertModalProps {
  isOpen: boolean
  loading: boolean
  onClose: () => void
  onConfirm: () => void
}

export const AlertModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm
}: AlertModalProps) => {
  const { mounted } = useMounted()

  if (!mounted) return null

  return (
    <Modal
      title="Você tem certeza?"
      description="Essa ação não pode ser alterada."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex flex-center justify-end w-full">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
        >
          Deletar
        </Button>
      </div>
    </Modal>
  )
}
