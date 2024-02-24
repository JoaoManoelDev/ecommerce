import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { sizeBodyValidation } from "@/app/api/validations/size"

interface RouteParams {
  params: {
    storeId: string
    sizeId: string
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.sizeId) NextResponse.json({ message: "Size id is required" }, { status: 400 })

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      }
    })

    return NextResponse.json(size, { status: 200 })

  } catch (error) {
    console.log("[SIZE_GET]", error)
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

    if (!params.sizeId) NextResponse.json({ message: "Size id is required." }, { status: 400 })

    const body = await request.json()

    const validation = sizeBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const { name, value } = validation.data

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name: name,
        value: value,
      }
    })

    return NextResponse.json(size, { status: 200 })

  } catch (error) {
    console.log("[SIZE_PATCH]", error)
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

    if (!params.sizeId) NextResponse.json({ message: "Size id is required" }, { status: 400 })

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      }
    })

    return NextResponse.json({ message: "Size deleted successfully" }, { status: 200 })

  } catch (error) {
    console.log("[SIZE_DELETE]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
