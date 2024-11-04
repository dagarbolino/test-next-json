// src/app/_actions/milk-actions.ts
"use server"
 
import db from "@/db/db"
import { cache } from "@/lib/cache"
 
export const getPasteTypes = cache(
  async () => {
    return await db.categoriesPasteCheese.findMany()
  },
  ["pasteTypes"],
  { revalidate: 1 }
)
