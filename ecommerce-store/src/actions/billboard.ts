import { Billboard } from "@/entities/billboard"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

export const getBillboards = async (): Promise<Billboard[]> => {
  const response = await fetch(URL)

  return await response.json()
}

export const getBillboard = async (id: string): Promise<Billboard> => {
  const response = await fetch(`${URL}/${id}`)

  return await response.json()
}
