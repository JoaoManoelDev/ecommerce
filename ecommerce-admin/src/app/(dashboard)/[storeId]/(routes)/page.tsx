import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { priceFormatter } from "@/lib/formatter"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import { getGraphRevenue } from "@/actions/get-graph-revenue"

interface DashboardPageProps {
  params: {
    storeId: string
  }
}

export default async function DashboardPage({
  params
}: DashboardPageProps) {

  const [totalRevenue, salesCount, stockCount, graphRevenue] = await Promise.all([
    await getTotalRevenue(params.storeId),
    await getSalesCount(params.storeId),
    await getStockCount(params.storeId),
    await getGraphRevenue(params.storeId)
  ])

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Painel de controle"
          description="visão geral do seu painel de controle"
        />

        <Separator />

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0
              pb-2"
            >
              <CardTitle className="text-sm font-medium">
                Receita Total
              </CardTitle>
              <Icons.dollar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {priceFormatter(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0
              pb-2"
            >
              <CardTitle className="text-sm font-medium">
                Vendas
              </CardTitle>
              <Icons.creditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                +{salesCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0
              pb-2"
            >
              <CardTitle className="text-sm font-medium">
                Produtos Em Estoque
              </CardTitle>
              <Icons.package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {stockCount}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Visão Geral</CardTitle>
            </CardHeader>

            <CardContent className="">
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
