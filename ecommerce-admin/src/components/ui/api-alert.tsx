"use client"

import toast from "react-hot-toast"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge, BadgeProps } from "@/components/ui//badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Publico",
  admin: "Administrador"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive"
}

export const ApiAlert = ({
  title,
  description,
  variant = "public"
}: ApiAlertProps) => {

  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success("Rota de API copiada.")
  }

  return (
    <Alert>
      <Icons.server className="w-4" />

      <AlertTitle className="flex items-center gap-x-2 ">
        <span>{title}</span>
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>

      <AlertDescription className="mt-4 flex items-center justify-between">
        <code
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        >
          {description}
        </code>

        <Button
          variant="outline"
          size="icon"
          onClick={onCopy}
        >
          <Icons.copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
