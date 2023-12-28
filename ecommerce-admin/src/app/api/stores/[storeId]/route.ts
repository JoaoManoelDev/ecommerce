import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"

interface RouteParams {
  params: {
    storeId: string
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { userId } = auth()
    
    if (!userId) return NextResponse.json({ message: "Unauthorized." }, { status: 401 })

    if (!params.storeId) NextResponse.json({ message: "Store id is required." }, { status: 400 })

    const { name } = await request.json()

    if (!name) NextResponse.json({ message: "Name is required." }, { status: 400 })

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        user_id: userId
      },
      data: {
        name
      }
    })

    return NextResponse.json(store, { status: 201 })

  } catch (error) {
    console.log("[STORE_PATCH]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams
) {
  try {
    const { userId } = auth()
    
    if (!userId) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 })

    if (!params.storeId) NextResponse.json({ message: "Store id is required." }, { status: 400 })

    await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        user_id: userId
      }
    })

    return NextResponse.json({ message: "Store deleted successfully." })

  } catch (error) {
    console.log("[STORE_DELETE]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
