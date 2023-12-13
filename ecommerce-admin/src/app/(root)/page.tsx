import { UserButton } from "@clerk/nextjs"

export default function SetupPage() {
  return (
    <UserButton afterSignOutUrl="/" />
  )
}
