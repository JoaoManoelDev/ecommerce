import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { billboardBodyValidation } from "@/app/api/validations/billboard"

interface RouteParams {
  params: {
    storeId: string
    billboardId: string
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.billboardId) NextResponse.json({ message: "Billboard id is required" }, { status: 400 })

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      }
    })

    return NextResponse.json(billboard, { status: 200 })

  } catch (error) {
    console.log("[BILLBOARD_GET]", error)
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

    if (!params.billboardId) NextResponse.json({ message: "Billboard id is required." }, { status: 400 })

    const body = await request.json()

    const validation = billboardBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const { label, imageUrl } = validation.data

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        user_id: userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        image_url: imageUrl
      }
    })

    return NextResponse.json(billboard, { status: 200 })

  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error)
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

    if (!params.billboardId) NextResponse.json({ message: "Billboard id is required" }, { status: 400 })

    const storeExists = prismadb.store.findFirst({
      where: {
        id: params.storeId,
        user_id: userId
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })

    await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      }
    })

    return NextResponse.json({ message: "Billboard deleted successfully" }, { status: 200 })

  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
