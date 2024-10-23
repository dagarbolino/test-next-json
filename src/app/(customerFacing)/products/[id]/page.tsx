import { ProductCard } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { notFound } from "next/navigation"

const getAllProducts = cache(
  async () => {
    return db.product.findMany({
      include: { 
        categoriesMilks: true,
        categoriesPasteCheese: true,
        unitType: true
      }
    })
  },
  ["allProducts"],
  { revalidate: 60 * 60 * 24 }
)

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  console.log("Params reçus:", params);

  const allProducts = await getAllProducts()
  console.log("Nombre total de produits:", allProducts.length);

  const milkType = decodeURIComponent(params.id)
  console.log("Type de lait recherché:", milkType);

  const filteredProducts = allProducts.filter(product =>
    product.categoriesMilks.name.toLowerCase() === milkType.toLowerCase()
  )
  console.log("Nombre de produits filtrés:", filteredProducts.length);

  if (filteredProducts.length === 0) {
    console.log("Aucun produit trouvé pour ce type de lait");
    notFound()
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
