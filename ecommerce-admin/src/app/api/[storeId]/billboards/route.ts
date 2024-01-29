import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { billboardBodyValidation } from "@/app/api/validations/billboard"

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
      }
    })

    if (!storeExists) return NextResponse.json({ message: "Store not found." }, { status: 404 })
    
    const body = await request.json()

    const validation = billboardBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const { label, imageUrl } = validation.data

    const newBillboard = await prismadb.billboard.create({
      data: {
        label,
        image_url: imageUrl,
        store_id: params.storeId
      }
    })

    return NextResponse.json(newBillboard, { status: 201 })

  } catch (error) {
    console.log("[CREATE_BILLBOARD_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.storeId) return NextResponse.json({ message: "Store id is required." }, { status: 400 })

    const billboards = await prismadb.billboard.findMany({
      where: {
        store_id: params.storeId
      }
    })

    return NextResponse.json(billboards, { status: 200 })

  } catch (error) {
    console.log("[GET_BILLBOARDS_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
