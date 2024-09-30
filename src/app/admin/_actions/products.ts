"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const fileSchema = typeof File !== 'undefined' 
  ? z.instanceof(File, { message: "Required" })
  : z.any();

const imageSchema = fileSchema.refine(
  (file) => !file || file.size === 0 || (file.type && file.type.startsWith("image/")),
  { message: "Must be an image file or empty" }
);

const addSchema = z.object({
  name: z.string().min(1),
  categoriesMilksId: z.string().min(1, "Required"),
  categoriesPasteCheeseId: z.string().min(1, "Required"),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addProduct(prevState: unknown, formData: FormData) {
  console.log("Début de la fonction addProduct")
  
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    console.error("Erreur de validation:", result.error.formErrors.fieldErrors)
    return result.error.formErrors.fieldErrors
  }

  console.log("Validation du schéma réussie")
  const data = result.data

  try {
    console.log("Création du dossier 'products'")
    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    console.log("Écriture du fichier:", filePath)
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    console.log("Création du dossier 'public/products'")
    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    console.log("Écriture de l'image:", imagePath)
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )

    console.log("Création du produit dans la base de données")
    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
        categoriesMilks: {
          connect: { id: data.categoriesMilksId }
        },
        categoriesPasteCheese: {
          connect: { id: data.categoriesPasteCheeseId }
        },
      },
    })

    console.log("Revalidation des chemins")
    revalidatePath("/")
    revalidatePath("/products")

    console.log("Produit créé avec succès, redirection vers /admin/products")
    return redirect("/admin/products")
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error)
    throw error
  }
}
const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
})

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  let filePath = product.filePath
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath)
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  }

  let imagePath = product.imagePath
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
      categoriesMilks: {
        connect: { id: data.categoriesMilksId }
      },
      categoriesPasteCheese: {
        connect: { id: data.categoriesPasteCheeseId }
      },
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  if (product == null) return notFound()

  await fs.unlink(product.filePath)
  await fs.unlink(`public${product.imagePath}`)

  revalidatePath("/")
  revalidatePath("/products")
}
