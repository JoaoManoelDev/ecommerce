import { getBillboard } from "@/actions/billboard"
import { getProducts } from "@/actions/products"
import { Billboard } from "@/components/billboard"
import { ProductList } from "@/components/products-list"
import { Container } from "@/components/ui/container"

export const revalidate = 0

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true })
  const billboard = await getBillboard("57cdd6fa-9d5f-41d2-900d-91f7009c4e00")

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8">
          <ProductList title="Produtos em destaque" products={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage
