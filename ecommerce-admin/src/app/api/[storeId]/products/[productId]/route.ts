import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { productBodyValidation } from "@/app/api/validations/product"

interface RouteParams {
  params: {
    storeId: string
    productId: string
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.productId) NextResponse.json({ message: "Product ID is required" }, { status: 400 })

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true
      }
    })

    return NextResponse.json(product, { status: 200 })

  } catch (error) {
    console.log("[PRODUCT_GET]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { userId } = auth()
    
    if (!userId) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 })

    if (!params.productId) NextResponse.json({ message: "Product ID is required." }, { status: 400 })

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

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    const priceInCents = price * 100

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
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
          deleteMany: {}
        }
      }
    })

    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map(image => image)
            ]
          }
        }
      }
    })

    return NextResponse.json(product, { status: 200 })

  } catch (error) {
    console.log("[PRODUCT_PATCH]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams
) {
  try {
    const { userId } = auth()
    
    if (!userId) return NextResponse.json({ message: "Unauthorized." }, { status: 401 })

    if (!params.productId) NextResponse.json({ message: "Product ID is required." }, { status: 400 })

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      }
    })

    return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 })

  } catch (error) {
    console.log("[PRODUCT_DELETE]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
