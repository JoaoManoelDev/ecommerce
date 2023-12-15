import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"

export async function POST(
  request: Response
) {
  try {
    
    const { userId } = auth()

    if (!userId) return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
    
    const body = await request.json()
    const { name } = body

    if (!name) return NextResponse.json({ message: "Name is required." }, { status: 400 })

    const newStore = await prismadb.store.create({
      data: {
        name,
        user_id: userId
      }
    })

    return NextResponse.json(newStore, { status: 201 })

  } catch (error) {
    console.log("[CREATE_STORE_ERROR]", error)
    return NextResponse.json({ message: "Internal error." }, { status: 500 })
  }
}
