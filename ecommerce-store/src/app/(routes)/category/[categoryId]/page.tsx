import { Filter } from "./components/filter"
import { MobileFilter } from "./components/mobile-filter"
import { Billboard } from "@/components/billboard"
import { Container } from "@/components/ui/container"
import { NoResults } from "@/components/ui/no-results"
import { ProductCard } from "@/components/ui/product-card"
import { getCategory } from "@/actions/categories"
import { getColors } from "@/actions/colors"
import { getProducts } from "@/actions/products"
import { getSizes } from "@/actions/sizes"

export const revalidate = 0

interface CategoryPageProps {
  params: {
    categoryId: string
  },
  searchParams: {
    colorId: string,
    sizeId: string
  }
}

const CategoryPage = async ({
  params,
  searchParams
}: CategoryPageProps) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId
  })
  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory({
    categoryId: params.categoryId,
    include: ["billboard"]
  })

  return (
    <Container>
      <Billboard
        data={category.billboard}
      />
      <div>
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilter colors={colors} sizes={sizes} />
          <div className="hidden lg:block">
            <Filter
              valueKey="sizeId"
              name="Sizes"
              data={sizes}
            />

            <Filter
              valueKey="colorId"
              name="Cores"
              data={colors}
            />
          </div>

          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </Container>
  )
}

export default CategoryPage
