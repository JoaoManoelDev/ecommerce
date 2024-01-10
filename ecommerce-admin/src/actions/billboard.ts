"use server"

import { prismadb } from "@/lib/prismadb"

export const getBillboardsByStoreId = async (storeId: string) => {
  const billboards = prismadb.billboard.findMany({
    where: {
      store_id: storeId
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return billboards
}

export const getBillboardById = async (billboardId: string) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId
    }
  })

  return billboard
}