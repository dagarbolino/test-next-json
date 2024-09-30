"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import {
  deleteCategoryPasteCheese,
} from "../../_actions/categoriesPasteCheese"
import { useRouter } from "next/navigation"



export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string
  disabled: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteCategoryPasteCheese(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}