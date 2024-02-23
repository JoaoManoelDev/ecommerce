import { cn } from "@/lib/utils"

interface ContainerProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const Container = ({
  children,
  className
}: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-6xl px-2 md:px-4", className)}>
      {children}
    </div>
  )
}
