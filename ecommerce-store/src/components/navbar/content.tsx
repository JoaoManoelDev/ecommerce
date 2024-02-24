"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Category } from "@/entities/category"

interface NavbarContentProps extends React.HtmlHTMLAttributes<HTMLElement> {
  data: Category[]
}

export const NavbarContent = ({
  className,
  data
}: NavbarContentProps) => {
  const pathname = usePathname()

  // TODO: CREATE CORRECT LOGIC TO ROUTES

  const routes = data?.map(route => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: RegExp(`^/category(?:/.*)?$`).test(pathname),
  }))

  return (
    <nav className={cn("flex items-center space-x-2 lg:space-x-4", className)}>
      {routes.map(route => (
        <Link
          key={route.label}
          href={route.href}
          className={cn(
            "text-md font-bold transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
