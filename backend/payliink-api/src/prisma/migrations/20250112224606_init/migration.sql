/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `agencys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `agencys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stateRegistration]` on the table `agencys` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "password", "role", "username") SELECT "id", "password", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "agencys_name_key" ON "agencys"("name");

-- CreateIndex
CREATE UNIQUE INDEX "agencys_cnpj_key" ON "agencys"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "agencys_stateRegistration_key" ON "agencys"("stateRegistration");
