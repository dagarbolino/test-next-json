import { ProductCard } from "@/components/ProductCardDetail"

import db from "@/db/db"
import { cache } from "@/lib/cache"
import { notFound } from "next/navigation"

const getProduct = cache(
  async (name: string) => {
    const decodedName = decodeURIComponent(name);
    console.log("Nom décodé:", decodedName);
    const product = await db.product.findFirst({
      where: { name: decodedName },
      include: { 
        categoriesMilks: true,
        categoriesPasteCheese: true,
        unitType: true
      }
    })
    console.log("Produit trouvé:", product);
    if (!product) notFound()
    return product
  },
  ["product"],
  { revalidate: 60 * 60 * 24 }
)

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  console.log("Params reçus:", params);
  const product = await getProduct(params.id)
  console.log("Produit récupéré dans la page:", product);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>


      <ProductCard
        {...product} 
        categoriesMilks={product.categoriesMilks.name}
        categoriesPasteCheese={product.categoriesPasteCheese.name}
        unitType={product.unitType.name}
      />
      
    </div>
  )
}
