import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { colorBodyValidation } from "@/app/api/validations/color"

interface RouteParams {
  params: {
    storeId: string
    colorId: string
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.colorId) NextResponse.json({ message: "Color id is required" }, { status: 400 })

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      }
    })

    return NextResponse.json(color, { status: 200 })

  } catch (error) {
    console.log("[COLOR_GET]", error)
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

    if (!params.colorId) NextResponse.json({ message: "Color id is required." }, { status: 400 })

    const body = await request.json()

    const validation = colorBodyValidation.safeParse(body)

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

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name: name,
        value: value,
      }
    })

    return NextResponse.json(color, { status: 200 })

  } catch (error) {
    console.log("[COLOR_PATCH]", error)
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

    if (!params.colorId) NextResponse.json({ message: "Color id is required" }, { status: 400 })

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      }
    })

    return NextResponse.json({ message: "Color deleted successfully" }, { status: 200 })

  } catch (error) {
    console.log("[COLOR_DELETE]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
