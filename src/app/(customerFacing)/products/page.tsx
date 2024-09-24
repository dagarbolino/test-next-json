import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
    include: { categoriesMilks: true },
  })
}, ["/products", "getProducts"])

async function ProductsSuspense() {
  const products = await getProducts()

  return products.map(({ id, categoriesMilks, ...product }) => (
    <ProductCard 
      key={id} 
      {...product} 
      categoriesMilks={categoriesMilks?.name || ''} 
    />
  ))
}


export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  )
}



