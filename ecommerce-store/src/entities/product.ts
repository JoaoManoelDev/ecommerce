import { Category } from "@/entities/category"
import { Color } from "@/entities/color"
import { Size } from "@/entities/size"
import { Image } from "@/entities/image"
 
export interface Product {
  id: string
  category: Category
  name: string
  price: number
  isFeatured: boolean
  size: Size
  color: Color
  images: Image[]
}