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
        <PageHeader>Unit type</PageHeader>
        <Button asChild>
          <Link href="/admin/unitType/new">Add Unit Type</Link>
        </Button>
      </div>
      <CategoriesTable />
    </>
  )
}

async function CategoriesTable() {
  const categoriesUnitType = await db.unitType.findMany({
    select: {
      id: true,
      name: true,
    },

  })

  if (categoriesUnitType.length === 0) return <p>No unit type found</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>

          <TableHead>Name</TableHead>


          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoriesUnitType.map(categoriesUnitTypes => (
          <TableRow key={categoriesUnitType.id}>

            <TableCell>{categoriesUnitType.name}</TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                  <DropdownMenuItem asChild>
                    <Link href={`/admin/unitType/${categoriesUnitType.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  
                  <DeleteDropdownItem
                    id={categoriesUnitType.id}
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