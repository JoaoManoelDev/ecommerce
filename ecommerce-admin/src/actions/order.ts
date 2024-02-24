import { prismadb } from "@/lib/prismadb"

interface GetOrdersByStoryIdProps {
  storeId: string
}

export const getOrdersByStoryId = async ({
  storeId
}: GetOrdersByStoryIdProps) => {
  const order = await prismadb.order.findMany({
    where: {
      storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return order
}
