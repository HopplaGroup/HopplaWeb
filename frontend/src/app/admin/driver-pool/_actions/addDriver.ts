"use server";

import { createServerAction } from "@/lib/utils/createServerAction";
import addDriverSchema from "../_schemas/addDriverSchema";

const addDriver = createServerAction(
  addDriverSchema,
  async (data, db) => {
    // Create the user and car in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create a fake user (driver) with verified status
      const user = await tx.user.create({
        data: {
          email: data.email,
          name: data.name,
          mobileNumber: data.mobileNumber,
          profileImg: data.profileImg,
          bio: data.bio || "",
          sex: data.sex,
          isNewUser: false, // Not a new user - fully set up
          isUserVerified: true, // Pre-verified driver
          birthDate: new Date("1990-01-01"), // Default birth date
          idNumber: "FD-" + Date.now(), // Unique ID for fake driver
          IDPhotos: [], // Empty ID photos for fake drivers
        },
      });

      // Create the driver verification request as approved
      await tx.driverVerificationRequest.create({
        data: {
          driverId: user.id,
          licencePhotos: [],
          selfie: data.profileImg, // Use profile image as selfie
          status: "APPROVED",
        },
      });

      // Create the car for this driver
      const car = await tx.car.create({
        data: {
          name: data.carName,
          type: data.carType ?? "STANDARD",
          plate: data.carPlate,
          mark: data.carMark,
          capacity: data.carCapacity,
          fuelType: data.carFuelType ?? "GASOLINE",
          photos: data.carPhotos,
          licensePhotos: [], // Empty license photos for fake driver cars
          status: "APPROVED", // Pre-approved car
          ownerId: user.id,
        },
      });

      return { user, car };
    });

    return result;
  },
  {
    userShouldBeActive: true,
    roles: ["ADMIN"],
    revalidatePath: "/admin/driver-pool",
    errorMessage: "Failed to create driver",
    successMessage: "Driver added successfully!",
  }
);

export default addDriver;
