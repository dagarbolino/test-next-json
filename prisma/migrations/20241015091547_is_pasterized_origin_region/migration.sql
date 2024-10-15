-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "isPasteurizedMilk" BOOLEAN NOT NULL DEFAULT true,
    "origin" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoriesPasteCheeseId" TEXT NOT NULL,
    "categoriesMilksId" TEXT NOT NULL,
    CONSTRAINT "Product_categoriesPasteCheeseId_fkey" FOREIGN KEY ("categoriesPasteCheeseId") REFERENCES "CategoriesPasteCheese" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_categoriesMilksId_fkey" FOREIGN KEY ("categoriesMilksId") REFERENCES "CategoriesMilks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoriesMilksId", "categoriesPasteCheeseId", "createdAt", "description", "filePath", "id", "imagePath", "isAvailableForPurchase", "isPasteurizedMilk", "name", "origin", "priceInCents", "region", "updatedAt") SELECT "categoriesMilksId", "categoriesPasteCheeseId", "createdAt", "description", "filePath", "id", "imagePath", "isAvailableForPurchase", "isPasteurizedMilk", "name", "origin", "priceInCents", "region", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
