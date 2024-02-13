import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { sizeBodyValidation } from "@/app/api/validations/size"

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

    const validation = sizeBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const { name, value } = validation.data

    const newSize = await prismadb.size.create({
      data: {
        name,
        value,
        store_id: params.storeId,
      }
    })

    return NextResponse.json(newSize, { status: 201 })

  } catch (error) {
    console.log("[CREATE_SIZE_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  try {
    if (!params.storeId) return NextResponse.json({ message: "Store id is required." }, { status: 400 })

    const sizes = await prismadb.size.findMany({
      where: {
        store_id: params.storeId
      }
    })

    return NextResponse.json(sizes, { status: 200 })

  } catch (error) {
    console.log("[GET_SIZE_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
