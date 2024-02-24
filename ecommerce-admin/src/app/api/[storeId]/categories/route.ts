import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { categoryBodyValidation } from "@/app/api/validations/category"

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
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })
    
    const body = await request.json()

    const validation = categoryBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const { name, billboardId } = validation.data

    const newCategory = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      }
    })

    return NextResponse.json(newCategory, { status: 201 })

  } catch (error) {
    console.log("[CREATE_CATEGORY_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.storeId) return NextResponse.json({ message: "Store id is required." }, { status: 400 })

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    })

    return NextResponse.json(categories, { status: 200 })

  } catch (error) {
    console.log("[GET_CATEGORIES_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
