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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoriesMilksId" TEXT NOT NULL,
    CONSTRAINT "Product_categoriesMilksId_fkey" FOREIGN KEY ("categoriesMilksId") REFERENCES "CategoriesMilks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoriesMilksId", "createdAt", "description", "filePath", "id", "imagePath", "isAvailableForPurchase", "name", "priceInCents", "updatedAt") SELECT "categoriesMilksId", "createdAt", "description", "filePath", "id", "imagePath", "isAvailableForPurchase", "name", "priceInCents", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
