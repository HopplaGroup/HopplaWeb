"use server";

import { createServerAction } from "@/lib/utils/createServerAction";
import addUserSchema from "../_schemas/addUserSchema";

const addUser = createServerAction(
  addUserSchema,
  async (data, db) => {
    // Create a fake user (passenger)
    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        mobileNumber: data.mobileNumber,
        profileImg: data.profileImg,
        bio: data.bio || "",
        sex: data.sex ?? "OTHER",
        isNewUser: false, // Not a new user - fully set up
        isUserVerified: false, // Regular user, not verified driver
        birthDate: new Date("1995-01-01"), // Default birth date
        idNumber: "FU-" + Date.now(), // Unique ID for fake user
        IDPhotos: [], // Empty ID photos for fake users
      },
    });

    return user;
  },
  {
    userShouldBeActive: true,
    roles: ["ADMIN"],
    revalidatePath: "/admin/user-pool",
    errorMessage: "Failed to create user",
    successMessage: "User added successfully!",
  }
);

export default addUser;
