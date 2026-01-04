-- CreateEnum
CREATE TYPE "PreferredTimeSlot" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'NIGHT', 'ANY');

-- CreateEnum
CREATE TYPE "PassengerTripRequestStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'FULFILLED');

-- CreateTable
CREATE TABLE "PassengerTripRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passengerId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "departureDateFrom" TIMESTAMP(3) NOT NULL,
    "departureDateTo" TIMESTAMP(3) NOT NULL,
    "preferredTimeSlot" "PreferredTimeSlot" NOT NULL DEFAULT 'ANY',
    "seatsNeeded" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "preferences" JSONB NOT NULL DEFAULT '[]',
    "status" "PassengerTripRequestStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "PassengerTripRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PassengerTripRequest" ADD CONSTRAINT "PassengerTripRequest_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
