/*
  Warnings:

  - You are about to drop the column `storesQuantity` on the `agencys` table. All the data in the column will be lost.
  - Added the required column `cnpj` to the `agencys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateRegistration` to the `agencys` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_agencys" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "stateRegistration" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_agencys" ("createdAt", "id", "name", "status", "updatedAt") SELECT "createdAt", "id", "name", "status", "updatedAt" FROM "agencys";
DROP TABLE "agencys";
ALTER TABLE "new_agencys" RENAME TO "agencys";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
