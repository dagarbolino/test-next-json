"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from "react-dom"
import { UnitType } from "@prisma/client"
import { addUnitType, updateUnitType } from "../../_actions/categoriesUnitType"


export function CategoryForm({ category }: { category?: UnitType | null }) {
  const [error, action] = useFormState(
    category == null ? addUnitType : updateUnitType.bind(null, category.id),
    {}
  )


  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={category?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>




      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}