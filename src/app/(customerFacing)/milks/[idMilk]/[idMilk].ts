"use server"

import db from '@/db/db'

export async function getAllProducts() {
  try {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
      include: { 
        categoriesMilks: true,
        categoriesPasteCheese: true,
        unitType: true
      },
      orderBy: { updatedAt: 'desc' }
    })
    return products
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return []
  }
}
