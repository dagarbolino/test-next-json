"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"
import { CaretDownIcon } from "@radix-ui/react-icons"
import ProductsFilterMilks from "../ProductsFilterMilks"

export function NavigationMenu() {
	return (
		<NavigationMenuPrimitive.Root className="relative">
			<NavigationMenuPrimitive.List className="flex gap-4 p-4">
				<NavigationMenuPrimitive.Item>
					<NavigationMenuPrimitive.Trigger className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
						Produits <CaretDownIcon />
					</NavigationMenuPrimitive.Trigger>
					<NavigationMenuPrimitive.Content className="absolute top-full mt-2 p-2 bg-white rounded-md shadow-lg">
						<div className="flex w-56 gap-2">
							<NavigationMenuPrimitive.Link asChild>
              <div className="flex justify-center"><ProductsFilterMilks /></div>
							</NavigationMenuPrimitive.Link>
							<NavigationMenuPrimitive.Link asChild>
								<a href="/paste" className="px-4 py-2 hover:bg-gray-100 rounded-md">
									Types de pâte
								</a>
							</NavigationMenuPrimitive.Link>
						</div>
					</NavigationMenuPrimitive.Content>
				</NavigationMenuPrimitive.Item>


			</NavigationMenuPrimitive.List>

			<NavigationMenuPrimitive.Viewport className="relative mt-2" />
		</NavigationMenuPrimitive.Root>
	)
}
