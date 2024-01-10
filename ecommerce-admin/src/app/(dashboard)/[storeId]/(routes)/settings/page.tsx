import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { SettingsForm } from "./components/settings-form"
import { getStoreByIdAndUserId } from "@/actions/store"

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const store = await getStoreByIdAndUserId(params.storeId, userId)

  if (!store) redirect("/sign-in")

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}
