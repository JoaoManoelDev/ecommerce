"use client"

import { useEffect } from "react"

import { useStoreModalStore } from "@/stores/store-modal-store"

export default function SetupPage() {
  const { isOpen, onOpen } = useStoreModalStore()

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div>Root Page</div>
  )
}
