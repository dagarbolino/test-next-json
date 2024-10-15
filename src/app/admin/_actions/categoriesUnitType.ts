"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const addSchema = z.object({
  name: z.string().min(1),
})

export async function addUnitType(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await db.unitType.create({
    data: {
      name: data.name,
    },
  })

  revalidatePath("/")
  revalidatePath("/unitType")

  redirect("/admin/unitType")
}

export async function updateUnitType(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const editSchema = z.object({
    name: z.string().min(1),
  })

  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const categoryUnitType = await db.unitType.findUnique({ where: { id } })

  if (categoryUnitType == null) return notFound()

  await db.unitType.update({
    where: { id },
    data: {
      name: data.name,
    },
  })

  revalidatePath("/")
  revalidatePath("/unitType")

  redirect("/admin/unitType")
}


export async function deleteCategoryUnitType(id: string) {
  const categoryUnitType = await db.unitType.delete({ where: { id } })

  if (categoryUnitType == null) return notFound()


  revalidatePath("/")
  revalidatePath("/unitType")
}

export async function getAllCategoriesUnitType() {
  return await db.unitType.findMany()
}