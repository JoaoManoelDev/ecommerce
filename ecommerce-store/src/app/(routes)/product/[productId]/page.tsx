import { Container } from "@/components/ui/container"
import { getProduct, getProducts } from "@/actions/products"
import { ProductList } from "@/components/products-list"
import { Gallery } from "@/components/gallery"
import { Info } from "@/components/info"

interface ProductPageProps {
  params: {
    productId: string
  }
}

const ProductPage = async ({
  params
}: ProductPageProps) => {
  const product = await getProduct(params.productId)
  const suggestedProducts = await getProducts({
    categoryId: product.category.id,
  })

  return (
    <Container>
      <div className="py-8 space-y-24">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Gallery images={product.images} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info product={product} />
          </div>
        </div>

        <ProductList
          title="Artigos relacionados"
          products={suggestedProducts}
        />
      </div>
    </Container>
  )
}

export default ProductPage