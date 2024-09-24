"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const addSchema = z.object({
  name: z.string().min(1),
})

export async function addCategoryMilk(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await db.categoriesMilks.create({
    data: {
      name: data.name,
    },
  })

  revalidatePath("/")
  revalidatePath("/milkType")

  redirect("/admin/milkType")
}

export async function updateCategoryMilk(
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
  const categoryMilk = await db.categoriesMilks.findUnique({ where: { id } })

  if (categoryMilk == null) return notFound()

  await db.categoriesMilks.update({
    where: { id },
    data: {
      name: data.name,
    },
  })

  revalidatePath("/")
  revalidatePath("/milkType")

  redirect("/admin/milkType")
}


export async function deleteCategoryMilk(id: string) {
  const categoryMilk = await db.categoriesMilks.delete({ where: { id } })

  if (categoryMilk == null) return notFound()


  revalidatePath("/")
  revalidatePath("/milkType")
}

export async function getAllCategories() {
  return await db.categoriesMilks.findMany()
}