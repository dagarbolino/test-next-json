-- CreateTable
CREATE TABLE "CategoriesPasteCheese" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;

-- Ajout temporaire de la colonne nullable
ALTER TABLE "Product" ADD COLUMN "categoriesPasteCheeseId" TEXT;

-- Mise à jour des lignes existantes avec une valeur par défaut
UPDATE "Product" SET "categoriesPasteCheeseId" = (SELECT id FROM CategoriesPasteCheese LIMIT 1);

-- Création de la nouvelle table avec la colonne requise
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
    "categoriesPasteCheeseId" TEXT NOT NULL,
    "categoriesMilksId" TEXT NOT NULL,
    CONSTRAINT "Product_categoriesPasteCheeseId_fkey" FOREIGN KEY ("categoriesPasteCheeseId") REFERENCES "CategoriesPasteCheese" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_categoriesMilksId_fkey" FOREIGN KEY ("categoriesMilksId") REFERENCES "CategoriesMilks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Copie des données
INSERT INTO "new_Product" SELECT * FROM "Product";

-- Suppression de l'ancienne table
DROP TABLE "Product";

-- Renommage de la nouvelle table
ALTER TABLE "new_Product" RENAME TO "Product";

PRAGMA foreign_keys=ON;
