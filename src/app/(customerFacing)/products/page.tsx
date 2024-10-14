import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
    include: { 
      categoriesMilks: true,
      categoriesPasteCheese: true
    },
  })
}, ["/products", "getProducts"])

const getCategoriesPasteCheese = cache(() => {
  return db.categoriesPasteCheese.findMany()
}, ["/products", "getCategoriesPasteCheese"])

async function ProductsSuspense() {
  const [products, categoriesPasteCheese] = await Promise.all([
    getProducts(),
    getCategoriesPasteCheese()
  ])
  
  const productsWithCategories = products.map(product => {
    const pasteCheese = categoriesPasteCheese.find(cat => cat.id === product.categoriesPasteCheeseId)
    return { ...product, categoriesPasteCheese: pasteCheese }
  })

  console.log("Produits avec catégories:", JSON.stringify(productsWithCategories, null, 2))

  return productsWithCategories.map((product) => {
    const { id, categoriesMilks, categoriesPasteCheese, ...restProduct } = product
    return (
      <ProductCard 
        key={id} 
        {...restProduct} 
        categoriesMilks={categoriesMilks?.name || ''}
        categoriesPasteCheese={categoriesPasteCheese?.name || ''}
      />
    )
  })
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
