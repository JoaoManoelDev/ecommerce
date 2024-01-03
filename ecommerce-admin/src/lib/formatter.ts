import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dateFormatter = (date: Date) => format(date, "dd 'de' MMMM", { locale: ptBR })
