import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import db from "@/db/db"
import { MoreVertical } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "../_components/PageHeader"
import { DeleteDropdownItem } from "./_components/CategoryActions"

export default function AdminCategoriesPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Milk type</PageHeader>
        <Button asChild>
          <Link href="/admin/milkType/new">Add Milk Type</Link>
        </Button>
      </div>
      <CategoriesTable />
    </>
  )
}

async function CategoriesTable() {
  const categories = await db.categoriesMilks.findMany({
    select: {
      id: true,
      name: true,
    },

  })

  if (categories.length === 0) return <p>No milk type found</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>


          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map(categories => (
          <TableRow key={categories.id}>

            <TableCell>{categories.name}</TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                  <DropdownMenuItem asChild>
                    <Link href={`/admin/milkType/${categories.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  
                  <DeleteDropdownItem
                    id={categories.id}
                    disabled={false}
                  />

                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}