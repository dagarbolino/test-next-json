import { ProductCard } from "@/components/ProductCard"
import { getAllProducts } from "./[idPaste]"


export default async function PasteTypePage({ params }: { params: { idPaste: string } }) {
  console.log("Params complets reçus:", params);

  const allProducts = await getAllProducts()
  console.log("Produits avant filtrage:", allProducts.map(p => ({
    name: p.name,
    isAvailable: p.isAvailableForPurchase,
    milkType: p.categoriesMilks.name
  })));

  const pasteType = decodeURIComponent(params.idPaste)
  
  const filteredProducts = allProducts
    .filter(product => product.isAvailableForPurchase)
    .filter(product => product.categoriesPasteCheese.name.toLowerCase() === pasteType.toLowerCase());

  console.log("Produits après filtrage:", filteredProducts.map(p => ({
    name: p.name,
    isAvailable: p.isAvailableForPurchase,
    milkType: p.categoriesMilks.name
  })));

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Produits avec une {pasteType}</h1>
        <div className="p-8 bg-gray-100 rounded-lg">
          <p className="text-xl">
            Aucun produit disponible pour ce type de pâte actuellement.
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
      <h1 className="text-3xl font-bold mb-4">Produits avec une {pasteType}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            {...product}
            categoriesMilks={product.categoriesPasteCheese.name}
            categoriesPasteCheese={product.categoriesPasteCheese.name}
            unitType={product.unitType.name}
          />
        ))}
      </div>
    </div>
  )
}