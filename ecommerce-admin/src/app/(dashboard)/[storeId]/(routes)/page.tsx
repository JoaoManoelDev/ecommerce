import { getStoreById } from "@/actions/store"

interface DashboardPageProps {
  params: {
    storeId: string
  }
}

export default async function DashboardPage({
  params
}: DashboardPageProps) {
  const store = await getStoreById(params.storeId)

  return (
    <div>
      Loja ativa: {store?.name}
    </div>
  )
}
