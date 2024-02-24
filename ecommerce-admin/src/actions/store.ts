"use server"

import { prismadb } from "@/lib/prismadb"

export const getStoreById = async (storeId: string) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId
    }
  })

  return store
}

export const getStoreByUserId = async (userId: string) => {
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  })

  return store
}

export const getStoreByIdAndUserId = async (storeId: string, userId: string) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId
    }
  })

  return store
}
