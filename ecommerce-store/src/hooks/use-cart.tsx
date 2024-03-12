import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { Product } from "@/entities/product"
import toast from "react-hot-toast"

interface CartStore {
  products: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  removeAllProducts: () => void
}

export const useCart = create(
  persist<CartStore>((set, get) => ({
    products: [],
    addProduct: (product) => {
      const currentProducts = get().products
      const existingProduct = currentProducts.find(currentProduct => currentProduct.id === product.id)

      if (existingProduct) return toast("Produto ja está no carrinho.")

      set({ products: [...get().products, product] })
      toast.success("Produto adicionado no carrinho.")
    },
    removeProduct: (productId) => {
      set({ products: [...get().products.filter(product => product.id !== productId)] })
      toast.success("Produto removido do carrinho.")
    },
    removeAllProducts: () => set({ products: [] }),
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  })
)
