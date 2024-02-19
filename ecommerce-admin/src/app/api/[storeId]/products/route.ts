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
        user_id: userId
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
      isFeature,
    } = validation.data

    const priceInCents = price * 100

    const newProduct = await prismadb.product.create({
      data: {
        name,
        price: priceInCents,
        category_id: categoryId,
        color_id: colorId,
        size_id: sizeId,
        is_archived: isArchived,
        is_feature: isFeature,
        store_id: params.storeId,
        image: {
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
  const isFeature = searchParams.get("isFeature") || undefined

  console.log("É destaque",isFeature)

  try {
    if (!params.storeId) return NextResponse.json({ message: "Store id is required." }, { status: 400 })

    const products = await prismadb.product.findMany({
      where: {
        store_id: params.storeId,
        category_id: categoryId,
        color_id: colorId,
        size_id: sizeId,
        is_feature: isFeature ? true : undefined
    },
      include: {
        image: true
      }
    })

    return NextResponse.json(products, { status: 200 })

  } catch (error) {
    console.log("[GET_PRODUCTS_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
