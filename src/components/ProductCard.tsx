import { formatCurrency } from "@/lib/formatters"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"

type ProductCardProps = {
  name: string
  categoriesMilks: string
  categoriesPasteCheese: string
  priceInCents: number
  description: string
  imagePath: string
}


export function ProductCard({

  name,
  categoriesMilks,
  categoriesPasteCheese,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-48 h-full aspect-video">
        <Image className="" src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{categoriesMilks}</CardDescription>
        <CardDescription>{categoriesPasteCheese}</CardDescription>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>

    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <span className="block w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <span className="block w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <span className="block w-full h-4 rounded-full bg-gray-300" />
        <span className="block w-full h-4 rounded-full bg-gray-300" />
        <span className="block w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}