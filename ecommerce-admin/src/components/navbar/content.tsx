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
      href: `/${params.storeId}/categories`,
      label: "Categorias",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Tamanhos",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Outdoors",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Configurações",
      active: pathname === `/${params.storeId}/settings`,
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
