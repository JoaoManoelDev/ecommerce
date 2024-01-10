import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { Navbar } from "@/components/navbar"
import { getStoreByIdAndUserId } from "@/actions/store"

export default async function DashboardLayout ({
  children,
  params
}: {
  children: React.ReactNode,
  params: { storeId: string }
}) {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")
  
  const store = await getStoreByIdAndUserId(params.storeId, userId)

  if (!store) redirect("/")

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

