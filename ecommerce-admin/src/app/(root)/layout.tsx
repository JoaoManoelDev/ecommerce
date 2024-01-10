import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { getStoreByUserId } from "@/actions/store"

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) redirect("/")

  const store = await getStoreByUserId(userId)

  if (store) redirect(`/${store.id}`)

  return (
    <>
      {children}
    </>
  )
}
