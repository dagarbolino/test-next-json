"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"


import { CategoriesMilks, CategoriesPasteCheese, Product } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { getAllCategories } from "../../_actions/categories"
import { getAllCategoriesPasteCheese } from "../../_actions/categoriesPasteCheese"
import { addProduct, updateProduct } from "../../_actions/products"


export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {} as { [key: string]: string[] | undefined }
  )
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  )
  const [categories, setCategories] = useState<CategoriesMilks[]>([])
  const [categoriesPasteCheese, setCategoriesPasteCheese] = useState<CategoriesPasteCheese[]>([])

  useEffect(() => {
    getAllCategories().then(setCategories)
  }, [])

  useEffect(() => {
    getAllCategoriesPasteCheese().then(setCategoriesPasteCheese)
  }, [])

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoriesMilksId">Type de lait</Label>
        <Select name="categoriesMilksId" defaultValue={product?.categoriesMilksId}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type de lait" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error?.categoriesMilksId && (
          <div className="text-destructive">{error.categoriesMilksId}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoriesPasteCheeseId">Type de pâte</Label>
        <Select name="categoriesPasteCheeseId" defaultValue={product?.categoriesPasteCheeseId}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type de pâte" />
          </SelectTrigger>
          <SelectContent>
            {categoriesPasteCheese.map(categoryPasteCheese => (
              <SelectItem key={categoryPasteCheese.id} value={categoryPasteCheese.id}>
                {categoryPasteCheese.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error?.categoriesPasteCheeseId && (
          <div className="text-destructive">{error.categoriesPasteCheeseId}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error?.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {error?.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product != null && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
        {error?.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product.imagePath}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error?.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}