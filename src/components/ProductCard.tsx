"use client"

import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"
import { useState } from 'react'
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

type ProductCardProps = {
  name: string
  categoriesMilks: string
  categoriesPasteCheese: string
  priceInCents: number
  origin: string
  region: string
  isPasteurizedMilk: boolean
  description: string
  imagePath: string
}


export function ProductCard({
  name,
  categoriesMilks,
  categoriesPasteCheese,
  priceInCents,
  origin,
  region,
  isPasteurizedMilk,
  description,
  imagePath,
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="flex overflow-hidden flex-col relative">
      <Card className="absolute top-2 left-2 w-14 h-14 overflow-hidden group z-10 transition-all duration-300 ease-in-out hover:w-48 hover:h-48">
        <Image
          className="w-full h-full object-cover"
          src={imagePath}
          width={192}
          height={192}
          alt={name}
        />
      </Card>

      <CardHeader className="pt-20">
        <div className="flex flex-row justify-between">
          <CardTitle>{name}</CardTitle>
          <CardContent>{formatCurrency(priceInCents / 100)}</CardContent>
        </div>
        <CardContent>
          <CardDescription>Fromage au {categoriesMilks} et au {isPasteurizedMilk ? 'lait pasterisé' : 'lait cru'},</CardDescription>
          <CardDescription>avec une {categoriesPasteCheese}.</CardDescription>

          <CardDescription>Ce fromage est fabriqué en {origin},</CardDescription>
          <CardDescription>dans le département {region}.</CardDescription>
        </CardContent>



      </CardHeader>

      <CardDescription className="text-md underline ml-5 font-bold">Description:</CardDescription>
      <CardContent>
        <CardDescription className={`${isExpanded ? '' : 'line-clamp-2'}`}>{description}</CardDescription>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline mt-2"
        >
          {isExpanded ? 'Voir moins' : 'Voir plus'}
        </Button>
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