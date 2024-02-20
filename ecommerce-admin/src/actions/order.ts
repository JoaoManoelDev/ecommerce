import { prismadb } from "@/lib/prismadb"

interface GetOrdersByStoryIdProps {
  storeId: string
}

export const getOrdersByStoryId = async ({
  storeId
}: GetOrdersByStoryIdProps) => {
  const order = await prismadb.order.findMany({
    where: {
      store_id: storeId
    },
    include: {
      order_items: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return order
}
