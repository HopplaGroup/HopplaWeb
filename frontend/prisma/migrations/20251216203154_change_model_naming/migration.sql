/*
  Warnings:

  - You are about to drop the `RideRequestPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RideRequestRule` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TripRequestStatus" AS ENUM ('ACTIVE', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "RideRequestPost" DROP CONSTRAINT "RideRequestPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "RideRequestRule" DROP CONSTRAINT "RideRequestRule_rideRequestId_fkey";

-- DropForeignKey
ALTER TABLE "RideRequestRule" DROP CONSTRAINT "RideRequestRule_ruleId_fkey";

-- DropTable
DROP TABLE "RideRequestPost";

-- DropTable
DROP TABLE "RideRequestRule";

-- DropEnum
DROP TYPE "RideRequestStatus";

-- CreateTable
CREATE TABLE "PassengerTripRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "departureFrom" TIMESTAMP(3) NOT NULL,
    "departureTo" TIMESTAMP(3) NOT NULL,
    "seats" INTEGER NOT NULL DEFAULT 1,
    "status" "TripRequestStatus" NOT NULL DEFAULT 'ACTIVE',
    "description" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "PassengerTripRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripRequestRule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ruleId" TEXT NOT NULL,
    "rideRequestId" TEXT NOT NULL,

    CONSTRAINT "TripRequestRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripRequestRule_ruleId_rideRequestId_key" ON "TripRequestRule"("ruleId", "rideRequestId");

-- AddForeignKey
ALTER TABLE "PassengerTripRequest" ADD CONSTRAINT "PassengerTripRequest_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripRequestRule" ADD CONSTRAINT "TripRequestRule_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripRequestRule" ADD CONSTRAINT "TripRequestRule_rideRequestId_fkey" FOREIGN KEY ("rideRequestId") REFERENCES "PassengerTripRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
