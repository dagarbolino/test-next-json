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
import { DeleteDropdownItem } from "./_components/CategoryActionsPasteCheese"

export default function AdminPasteCheesesPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Paste Cheese</PageHeader>
        <Button asChild>
          <Link href="/admin/pasteCheese/new">Add Paste Cheese</Link>
        </Button>
      </div>
      <CategoriesTable />
    </>
  )
}

async function CategoriesTable() {
  const categories = await db.categoriesPasteCheese.findMany({
    select: {
      id: true,
      name: true,
    },

  })

  if (categories.length === 0) return <p>No paste cheese found</p>

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
                    <Link href={`/admin/pasteCheese/${categories.id}/edit`}>
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