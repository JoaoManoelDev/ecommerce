import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { prismadb } from "@/lib/prismadb"
import { storeBodyValidation } from "@/app/api/validations/store"

export async function POST(
  request: Response
) {
  try {
    
    const { userId } = auth()

    if (!userId) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 })
    
    const body = await request.json()

    const validation = storeBodyValidation.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(validation.error.formErrors.fieldErrors, { status: 400 })
    }

    const { name } = validation.data

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
