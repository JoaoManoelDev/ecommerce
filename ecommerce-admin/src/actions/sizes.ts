import { prismadb } from "@/lib/prismadb"

export const getSizeByStoreId = async (storeId: string) => {
  const sizes = await prismadb.size.findMany({
    where: {
      store_id: storeId
    }
  })

  return sizes
}

export const getSizeById = async (sizeId: string) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId
    }
  })
  
  return size
}
