import { z } from "zod";

const addDriverSchema = z.object({
  // User fields
  name: z.string().min(1).max(50),
  email: z.string().email(),
  mobileNumber: z.string().min(1).max(30),
  profileImg: z.string().url(),
  bio: z.string().optional().default(""),
  sex: z.enum(["MAN", "WOMAN", "OTHER"]).default("OTHER"),

  // Car fields
  carName: z.string().min(1).max(50),
  carType: z.enum(["STANDARD", "MINIVAN"]).default("STANDARD"),
  carPlate: z
    .string()
    .regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/, "Plate format: XX-000-XX"),
  carMark: z.string().min(1).max(50),
  carCapacity: z.number().int().min(1).max(8),
  carFuelType: z
    .enum([
      "GASOLINE",
      "DIESEL",
      "ELECTRIC",
      "HYBRID",
      "HYDROGEN",
      "CNG",
      "LPG",
      "ETHANOL",
    ])
    .default("GASOLINE"),
  carPhotos: z.array(z.string().url()).min(1),
});

export type AddDriverInput = z.infer<typeof addDriverSchema>;

export const addDriverErrorMap = (): Partial<
  Record<keyof AddDriverInput, string>
> => {
  return {
    name: "Please enter a valid name",
    email: "Please enter a valid email address",
    mobileNumber: "Please enter a valid mobile number",
    profileImg: "Please enter a valid profile image URL",
    carName: "Please enter a valid car name",
    carPlate: "Plate format should be: XX-000-XX",
    carMark: "Please enter a valid car brand",
    carCapacity: "Capacity should be between 1 and 8",
    carPhotos: "Please add at least one car photo",
  };
};

export const addDriverErrorMapClient = addDriverErrorMap();

export default addDriverSchema;
