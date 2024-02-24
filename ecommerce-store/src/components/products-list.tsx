import { NoResults } from "@/components/ui/no-results"
import { ProductCard } from "@/components/ui/product-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Product } from "@/entities/product"

interface ProductListProps {
  title: string
  products: Product[]
}

export const ProductList = ({
  products,
  title
}: ProductListProps) => {

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>

      {products.length === 0 && <NoResults />}

      <Carousel>
        <CarouselContent >
          {products.map(product => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/5">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  )
}
