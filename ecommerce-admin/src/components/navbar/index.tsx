import { redirect } from "next/navigation"
import { UserButton, auth } from "@clerk/nextjs"

import { StoreSwitcher } from "@/components/store-switcher"
import { NavbarContent } from "./content"
import { prismadb } from "@/lib/prismadb"

export const Navbar = async () => {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <NavbarContent className="mx-6" />

        <div className="ml-auto flex items-center">
          <UserButton />
        </div>
      </div>
    </div>
  )
}