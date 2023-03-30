-- CreateTable
CREATE TABLE "Taverns" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TavernId" TEXT,
    "TavernDescr" TEXT,

    CONSTRAINT "Taverns_pkey" PRIMARY KEY ("id")
);
