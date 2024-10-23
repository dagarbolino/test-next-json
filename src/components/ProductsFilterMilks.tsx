import db from "@/db/db";
import { cache } from "@/lib/cache";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "./ui/button";
import { revalidatePath } from "next/cache";


const getProductsFilterMilks = cache(() => {
  return db.categoriesMilks.findMany()
}, ["/", "getProductsFilterMilks"])


revalidatePath("/milks")

export default function ProductsFilterMilks() {
  return (
    <div className="flex justify-center">
      <Button variant="outline" asChild>
        <DropdownMenu>
          <DropdownMenuTrigger className="border-2 hover:border-orange-400 rounded-md p-2">Types de lait</DropdownMenuTrigger>
          <DropdownMenuContent>
            <Suspense fallback={<DropdownMenuItem>Chargement...</DropdownMenuItem>}>
              <MilkTypesList />
            </Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
      </Button>
    </div>
  )
}

async function MilkTypesList() {
  const milkTypes = await getProductsFilterMilks()
  return (
    <div className="flex flex-row mx-10 gap-4 w-full ">
      {milkTypes.map((milkType) => (
        <DropdownMenuItem key={milkType.name} asChild className={cn("w-full mx-6")}>
          <Link href={`/milks/${encodeURIComponent(milkType.name)}`} className="w-40 mt-4 text-left underline">
            {milkType.name}
          </Link>

        </DropdownMenuItem>
      ))}
    </div>
  )
}



