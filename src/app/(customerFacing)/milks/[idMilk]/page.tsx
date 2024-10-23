import { ProductCard } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"

const getAllProducts = cache(
  async () => {
    const products = await db.product.findMany({
      where: {
        isAvailableForPurchase: true
      },
      include: { 
        categoriesMilks: true,
        categoriesPasteCheese: true,
        unitType: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return products
  },
  ["allProducts"],
  { revalidate: 1 }
)
export default async function MilkTypePage({ params }: { params: { idMilk: string } }) {
  console.log("Params complets reçus:", params);

  const allProducts = await getAllProducts()
  console.log("Produits avant filtrage:", allProducts.map(p => ({
    name: p.name,
    isAvailable: p.isAvailableForPurchase,
    milkType: p.categoriesMilks.name
  })));

  const milkType = decodeURIComponent(params.idMilk)
  
  const filteredProducts = allProducts
    .filter(product => product.isAvailableForPurchase)
    .filter(product => product.categoriesMilks.name.toLowerCase() === milkType.toLowerCase());

  console.log("Produits après filtrage:", filteredProducts.map(p => ({
    name: p.name,
    isAvailable: p.isAvailableForPurchase,
    milkType: p.categoriesMilks.name
  })));

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Produits au lait de {milkType}</h1>
        <div className="p-8 bg-gray-100 rounded-lg">
          <p className="text-xl">
            Aucun produit disponible pour ce type de lait actuellement.
          </p>
          <p className="mt-4">
            N&rsquo;hésitez pas à revenir plus tard pour découvrir nos nouveaux produits !
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Produits au {milkType}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            {...product}
            categoriesMilks={product.categoriesMilks.name}
            categoriesPasteCheese={product.categoriesPasteCheese.name}
            unitType={product.unitType.name}
          />
        ))}
      </div>
    </div>
  )
}