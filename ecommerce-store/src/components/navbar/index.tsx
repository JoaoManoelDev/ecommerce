import { NavbarContent } from "./content"
import { NavbarActions } from "./actions"
import { Container } from "@/components/ui/container"
import { getCategories } from "@/actions/categories"

export const revalidate = 0

export const Navbar = async () => {
  const categories = await getCategories()

  return (
    <div className="border-b h-16 px-4">
      <Container className="flex gap-x-8 items-center h-full">
        <p className="font-bold text-2xl uppercase">Store</p>
        <NavbarContent data={categories} />
        <NavbarActions />
      </Container>
    </div>
  )
}