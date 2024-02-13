"use server"

import { prismadb } from "@/lib/prismadb"

export const getColorsByStoreId = async (storeId: string) => {
  const colors = await prismadb.color.findMany({
    where: {
      store_id: storeId
    }
  })

  return colors
}

export const getColorById = async (colorId: string) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId
    }
  })
  
  return color
}
