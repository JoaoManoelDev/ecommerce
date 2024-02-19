"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"

export const NavbarContent = ({
  className
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Geral",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Produtos",
      active: RegExp(`^/${params.storeId}/products(?:/.*)?$`).test(pathname),
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categorias",
      active: RegExp(`^/${params.storeId}/categories(?:/.*)?$`).test(pathname),
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Tamanhos",
      active: RegExp(`^/${params.storeId}/sizes(?:/.*)?$`).test(pathname),
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Cores",
      active: RegExp(`^/${params.storeId}/colors(?:/.*)?$`).test(pathname),
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Outdoors",
      active: RegExp(`^/${params.storeId}/billboards(?:/.*)?$`).test(pathname),
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Configurações",
      active: RegExp(`^/${params.storeId}/settings(?:/.*)?$`).test(pathname),
    }
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map(route => (
        <Link
          key={route.label}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
