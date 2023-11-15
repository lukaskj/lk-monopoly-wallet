/*
  Warnings:

  - You are about to alter the column `amount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `initialAmount` on the `game` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "operation" INTEGER NOT NULL,
    "ip" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "transaction_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("amount", "created_at", "id", "ip", "operation", "player_id", "updated_at") SELECT "amount", "created_at", "id", "ip", "operation", "player_id", "updated_at" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
CREATE TABLE "new_game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "creator_ip" TEXT,
    "initialAmount" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_game" ("created_at", "creator_ip", "finished", "id", "initialAmount", "name", "password", "updated_at") SELECT "created_at", "creator_ip", "finished", "id", "initialAmount", "name", "password", "updated_at" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
