import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dateFormatter = (date: Date) => format(date, "dd 'de' MMMM", { locale: ptBR })

export const priceFormatter = (price: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(price)
}
