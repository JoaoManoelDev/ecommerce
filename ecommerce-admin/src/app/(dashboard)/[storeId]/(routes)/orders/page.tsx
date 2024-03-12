import { OrderClient } from "./components/client"
import { OrderColumn } from "./components/columns"

import { dateFormatter, priceFormatter } from "@/lib/formatter"
import { getOrdersByStoryId } from "@/actions/order"

interface OrdersPageProps {
  params: {
    storeId: string
  }
}

export default async function OrdersPage({
  params
}: OrdersPageProps) {
  const orders = await getOrdersByStoryId({ storeId: params.storeId })

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems.map(orderItem => orderItem.product.name).join(', '),
    totalPrice: priceFormatter(order.orderItems.reduce((total, order) => {
      return total + (order.product.price / 100)
    }, 0)),
    createdAt: dateFormatter(order.createdAt),
    isPaid: order.isPaid
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}
