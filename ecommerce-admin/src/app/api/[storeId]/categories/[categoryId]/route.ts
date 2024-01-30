import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { categoryBodyValidation } from "@/app/api/validations/category"

interface RouteParams {
  params: {
    storeId: string
    categoryId: string
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.categoryId) NextResponse.json({ message: "Category id is required" }, { status: 400 })

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      }
    })

    return NextResponse.json(category, { status: 200 })

  } catch (error) {
    console.log("[CATEGORY_GET]", error)
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

    if (!params.categoryId) NextResponse.json({ message: "Category id is required." }, { status: 400 })

    const body = await request.json()

    const validation = categoryBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const { name, billboardId } = validation.data

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        user_id: userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name: name,
        billboard_id: billboardId,
      }
    })

    return NextResponse.json(category, { status: 200 })

  } catch (error) {
    console.log("[CATEGORY_PATCH]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams
) {
  try {
    const { userId } = auth()
    
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    if (!params.categoryId) NextResponse.json({ message: "Category id is required" }, { status: 400 })

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        user_id: userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      }
    })

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 })

  } catch (error) {
    console.log("[CATEGORY_DELETE]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
