import db from "@/db/db"
import { PageHeader } from "../../../_components/PageHeader"
import { CategoryFormPasteCheese } from "../../_components/CategoryFormPasteCheese"

export default async function EditPasteCheesePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const category = await db.categoriesPasteCheese.findUnique({ where: { id } })

  return (
    <>
      <PageHeader>Edit Category</PageHeader>
      <CategoryFormPasteCheese category={category} />
    </>
  )
}