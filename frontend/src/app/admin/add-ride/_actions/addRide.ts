"use server";

import { createServerAction } from "@/lib/utils/createServerAction";
import addRideSchema from "../_schemas/addRideSchema";

const addRide = createServerAction(
  addRideSchema,
  async (data, db) => {
    const result = await db.$transaction(async (tx) => {
      // Verify driver exists and has approved verification
      const driver = await tx.user.findUnique({
        where: { id: data.driverId },
        include: {
          driverVerificationRequest: true,
          cars: true,
        },
      });

      if (!driver) {
        throw new Error("Driver not found");
      }

      // Verify the car belongs to the driver
      const car = await tx.car.findFirst({
        where: {
          id: data.carId,
          ownerId: data.driverId,
        },
      });

      if (!car) {
        throw new Error("Car not found or doesn't belong to driver");
      }

      // Make sure passengers exist and are not the driver
      const passengers = await tx.user.findMany({
        where: {
          id: { in: data.passengerIds },
        },
      });

      if (passengers.length !== data.passengerIds.length) {
        throw new Error("One or more passengers not found");
      }

      if (data.passengerIds.includes(data.driverId)) {
        throw new Error("Driver cannot be a passenger");
      }

      // Validate that all seats are filled
      if (data.passengerIds.length !== car.capacity) {
        throw new Error(
          `All seats must be filled. Car has ${car.capacity} seats but ${data.passengerIds.length} passengers selected.`
        );
      }

      // Create the ride with 0 available seats (full)
      const ride = await tx.ride.create({
        data: {
          from: data.from,
          to: data.to,
          departure: data.departure,
          price: data.price,
          distance: data.distance ?? 0,
          duration: data.duration ?? 0,
          availableSeats: 0, // Full ride
          driverId: data.driverId,
          carId: data.carId,
          status: "ACTIVE",
        },
      });

      // Create passenger requests for all selected passengers (pre-accepted)
      await tx.ridePassengerRequest.createMany({
        data: data.passengerIds.map((passengerId) => ({
          passengerId,
          rideId: ride.id,
          status: "ACCEPTED",
        })),
      });

      // Create ride rules if any selected
      if (data.ruleIds && data.ruleIds.length > 0) {
        await tx.rideRule.createMany({
          data: data.ruleIds.map((ruleId) => ({
            ruleId,
            rideId: ride.id,
          })),
        });
      }

      return ride;
    });

    return result;
  },
  {
    userShouldBeActive: true,
    roles: ["ADMIN"],
    revalidatePath: "/admin/add-ride",
    errorMessage: "Failed to create ride",
    successMessage: "Ride created successfully!",
  }
);

export default addRide;
