-- CreateEnum
CREATE TYPE "RideRequestStatus" AS ENUM ('ACTIVE', 'CANCELLED');

-- CreateTable
CREATE TABLE "RideRequestPost" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "departureFrom" TIMESTAMP(3) NOT NULL,
    "departureTo" TIMESTAMP(3) NOT NULL,
    "seats" INTEGER NOT NULL DEFAULT 1,
    "status" "RideRequestStatus" NOT NULL DEFAULT 'ACTIVE',
    "description" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "RideRequestPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideRequestRule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ruleId" TEXT NOT NULL,
    "rideRequestId" TEXT NOT NULL,

    CONSTRAINT "RideRequestRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RideRequestRule_ruleId_rideRequestId_key" ON "RideRequestRule"("ruleId", "rideRequestId");

-- AddForeignKey
ALTER TABLE "RideRequestPost" ADD CONSTRAINT "RideRequestPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequestRule" ADD CONSTRAINT "RideRequestRule_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequestRule" ADD CONSTRAINT "RideRequestRule_rideRequestId_fkey" FOREIGN KEY ("rideRequestId") REFERENCES "RideRequestPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
