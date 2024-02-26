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
import { Icons } from "@/components/icons"

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
      <h3 className="font-bold text-3xl flex items-center gap-x-2">
        <span>{title}</span>
        <Icons.arrowRight className="w-6 h-6 md:hidden" />
      </h3>

      {products.length === 0 && <NoResults />}

      <Carousel className="md:mx-10 py-2 h-full">
        <CarouselContent>
          {products.map(product => (
            <CarouselItem key={product.id} className="basis-1/1 md:basis-1/3 lg:basis-1/5">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext variant="default" className="hidden md:flex" />
        <CarouselPrevious variant="default" className="hidden md:flex" />
      </Carousel>

    </div>
  )
}
