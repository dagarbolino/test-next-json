

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";



  
  export default function ProductsFilterMilks() {
    return (
      <div className="flex justify-center">
      <Button variant="outline" asChild>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-2 rounded-md p-2">Types de lait</DropdownMenuTrigger>
        <DropdownMenuContent>

          <DropdownMenuItem>Lait de vache</DropdownMenuItem>
          <DropdownMenuItem>Lait de chèvre</DropdownMenuItem>
          <DropdownMenuItem>Lait de brebis</DropdownMenuItem>


        </DropdownMenuContent>
      </DropdownMenu>
      </Button>
    </div>
  )
}




