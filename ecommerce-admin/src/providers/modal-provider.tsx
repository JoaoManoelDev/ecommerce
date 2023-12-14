"use client"

import { StoreModal } from "@/components/modals/store-modal"
import { useMounted } from "@/hooks/use-mounted"

export const ModalProvider = () => {
  const { mounted } = useMounted()

  if (!mounted) return null

  return (
    <>
      <StoreModal />
    </>
  )
}