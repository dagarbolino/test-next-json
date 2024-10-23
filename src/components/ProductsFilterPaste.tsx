import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"
import Link from "next/link";
import { cn } from "@/lib/utils";


const getProductsFilterPasteCheese = cache(() => {
  return db.categoriesPasteCheese.findMany()
}, ["/", "getProductsFiltercategoriesPasteCheese"])

export default function ProductsFilterPasteCheese() {
  return (
    <div className="flex justify-center">
      <Button variant="outline" asChild>
        <DropdownMenu>
          <DropdownMenuTrigger className="border-2 hover:border-orange-400 rounded-md  p-2">Types de pâte</DropdownMenuTrigger>
          <DropdownMenuContent>
            <Suspense fallback={<DropdownMenuItem>Chargement...</DropdownMenuItem>}>
              <PasteCheesesList />
            </Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
      </Button>
    </div>
  )
}

async function PasteCheesesList() {
  const pasteCheeses = await getProductsFilterPasteCheese()
  return (
    <div className="flex flex-row mx-10 gap-4 w-full">
      {pasteCheeses.map((pasteCheese) => (
        <DropdownMenuItem key={pasteCheese.name} asChild className={cn("w-full mx-6")}>
          <Link href={`/paste/${encodeURIComponent(pasteCheese.name)}`} className="w-40 mt-4 text-left underline">
            {pasteCheese.name}
          </Link>
        </DropdownMenuItem>
      ))}
    </div>
  )
}



