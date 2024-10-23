
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import ProductsFilterMilks from "@/components/ProductsFilterMilks"
import ProductsFilterPasteCheese from "@/components/ProductsFilterPaste"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      take: 6,
    })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}, ["/", "getNewestProducts"])



export default function HomePage() {
  return (
    <main className="space-y-12 ">
      <div className="h-18 flex flex-row justify-end items-center gap-2">
        <h2 className="">Filtrer par:</h2>
        <div className="flex justify-center"><ProductsFilterMilks /></div>
        <div className="flex justify-center"><ProductsFilterPasteCheese /></div>
      </div>
      <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts} />
      <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
    </main>
  )
}

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />

            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    </div>
  )
}

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
    include: {
      categoriesMilks: true
    },
  })
}, ["/products", "getProducts"])

const getCategoriesPasteCheese = cache(() => {
  return db.categoriesPasteCheese.findMany()
}, ["/products", "getCategoriesPasteCheese"])

const getCategoriesUnitType = cache(() => {
  return db.unitType.findMany()
}, ["/products", "getCategoriesUnitType"])

async function ProductsSuspense() {
  const [products, categoriesPasteCheese, categoriesUnitType] = await Promise.all([
    getProducts(),
    getCategoriesPasteCheese(),
    getCategoriesUnitType()
  ])

  const productsWithCategories = products.map(product => {
    const pasteCheese = categoriesPasteCheese.find(cat => cat.id === product.categoriesPasteCheeseId)
    const unitType = categoriesUnitType.find(unit => unit.id === product.unitTypeId)
    return { ...product, categoriesPasteCheese: pasteCheese, categoriesUnitType: unitType }
  })

  console.log("Produits avec catégories:", JSON.stringify(productsWithCategories, null, 2))

  return productsWithCategories.map((product) => {
    const { id, categoriesMilks, categoriesPasteCheese, categoriesUnitType, ...restProduct } = product
    return (
      <ProductCard
        key={id}
        {...restProduct}
        categoriesMilks={categoriesMilks?.name || ''}
        categoriesPasteCheese={categoriesPasteCheese?.name || ''}
        unitType={categoriesUnitType?.name || ''}
      />
    )
  })
}