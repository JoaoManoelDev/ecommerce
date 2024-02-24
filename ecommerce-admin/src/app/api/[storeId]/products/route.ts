import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { productBodyValidation } from "../../validations/product"

interface RouteParams {
  params: {
    storeId: string
  }
}

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  try {
    
    const { userId } = auth()

    if (!userId) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 })

    if (!params.storeId) return NextResponse.json({ message: "Store id is required." }, { status: 400 })

    const storeExists = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      },
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })
    
    const body = await request.json()

    const validation = productBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const {
      categoryId,
      colorId,
      images,
      name,
      price,
      sizeId,
      isArchived,
      isFeatured,
    } = validation.data

    const priceInCents = price * 100

    const newProduct = await prismadb.product.create({
      data: {
        name,
        price: priceInCents,
        categoryId: categoryId,
        colorId: colorId,
        sizeId: sizeId,
        isArchived: isArchived,
        isFeatured: isFeatured,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map(image=> image)
            ]
          }
        }
      }
    })

    return NextResponse.json(newProduct, { status: 201 })

  } catch (error) {
    console.log("[CREATE_PRODUCT_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get("categoryId") || undefined
  const colorId = searchParams.get("colorId") || undefined
  const sizeId = searchParams.get("sizeId") || undefined
  const isFeatured = searchParams.get("isFeatured") || undefined


  try {
    if (!params.storeId) return NextResponse.json({ message: "Store id is required." }, { status: 400 })

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId: categoryId,
        colorId: colorId,
        sizeId:sizeId,
        isFeatured: isFeatured ? true : undefined
    },
      include: {
        images: true
      }
    })

    return NextResponse.json(products, { status: 200 })

  } catch (error) {
    console.log("[GET_PRODUCTS_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
