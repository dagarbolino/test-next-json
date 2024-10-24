"use server"

import db from "@/db/db"

export async function getMilkTypes() {
  return await db.categoriesMilks.findMany()
}