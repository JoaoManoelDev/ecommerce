import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ptBR } from "@clerk/localizations"

import { ModalProvider } from "@/providers/modal-provider"
import { ToasterProvider } from "@/providers/toast-provider"

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
    <html lang="pt-br">
      <body className={inter.className}>
        <ClerkProvider localization={ptBR}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
