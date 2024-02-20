import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import "@/styles/globals.css"

const urbanist = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pr-br">
      <body className={urbanist.className}>{children}</body>
    </html>
  )
}
