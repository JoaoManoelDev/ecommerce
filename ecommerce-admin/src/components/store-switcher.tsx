"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Store } from "@prisma/client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { useStoreModalStore } from "@/stores/store-modal-store"
import { cn } from "@/lib/utils"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

export const StoreSwitcher = ({
  className,
  items
}: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false)
  const storeModal = useStoreModalStore()
  const params = useParams()
  const router = useRouter()

  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find(item => item.value === params.storeId)

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecione a loja"
          className={cn("w-[200px] justify-between", className)}
        >
          <Icons.store className="mr-2 w-4 h-4" />
          {currentStore?.label}
          <Icons.chevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Buscar loja..." />
            <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>
            <CommandGroup heading="Lojas">
              {formattedItems.map(store => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer"
                >
                  <Icons.store className="mr-2 w-4 h-4" />
                  {store.label}
                  <Icons.check className={cn("ml-auto w-4 h-4", currentStore?.value === store.value
                    ? "opacity-100"
                    : "opacity-0"
                  )} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
                className="cursor-pointer"
              >
                <Icons.plusCircle className="mr-2 w-5 h-5" />
                Criar Loja
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
