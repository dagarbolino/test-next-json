"use server"

import db from "@/db/db"
import { cache } from "@/lib/cache"

export const getMilkTypes = cache(
  async () => {
    return await db.categoriesMilks.findMany()
  },
  ["milkTypes"],
  { revalidate: 1 }
)
