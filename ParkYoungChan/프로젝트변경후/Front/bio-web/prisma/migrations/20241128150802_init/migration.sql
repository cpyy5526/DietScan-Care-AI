-- CreateTable
CREATE TABLE "User" (
    "key_id" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "regi_date" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
