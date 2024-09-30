"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const addSchema = z.object({
  name: z.string().min(1),
})

export async function addCategoryPasteCheese(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await db.categoriesPasteCheese.create({
    data: {
      name: data.name,
    },
  })

  revalidatePath("/")
  revalidatePath("/pasteCheese")

  redirect("/admin/pasteCheese")
}

export async function updateCategoryPasteCheese(
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
  const categoryPasteCheese = await db.categoriesPasteCheese.findUnique({ where: { id } })

  if (categoryPasteCheese == null) return notFound()

  await db.categoriesPasteCheese.update({
    where: { id },
    data: {
      name: data.name,
    },
  })

  revalidatePath("/")
  revalidatePath("/pasteCheese")

  redirect("/admin/pasteCheese")
}


export async function deleteCategoryPasteCheese(id: string) {
  const categoryPasteCheese = await db.categoriesPasteCheese.delete({ where: { id } })

  if (categoryPasteCheese == null) return notFound()


  revalidatePath("/")
  revalidatePath("/pasteCheese")
}

export async function getAllCategoriesPasteCheese() {
  return await db.categoriesPasteCheese.findMany()
}