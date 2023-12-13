import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { ptBR } from "@clerk/localizations"

import { Inter } from "next/font/google"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
