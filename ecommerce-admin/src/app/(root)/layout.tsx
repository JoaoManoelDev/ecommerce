import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) redirect("/")

  const store = await prismadb.store.findFirst({
    where: {
      user_id: userId
    }
  })

  if (store) redirect(`/${store.id}`)

  return (
    <>
      {children}
    </>
  )
}
