-- CreateTable
CREATE TABLE "game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "creator_ip" TEXT,
    "initialAmount" DECIMAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Player',
    "color" TEXT NOT NULL DEFAULT '#ffffff',
    "game_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "player_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "operation" INTEGER NOT NULL,
    "ip" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "transaction_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

