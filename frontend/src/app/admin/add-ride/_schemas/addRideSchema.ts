import { z } from "zod";

const addRideSchema = z.object({
  // Driver info
  driverId: z.string().min(1, "Please select a driver"),
  carId: z.string().min(1, "Please select a car"),

  // Route info
  from: z.string().min(1, "Please select departure location"),
  to: z.string().min(1, "Please select destination"),

  // Time and pricing
  departure: z.date({ required_error: "Please select departure time" }),
  price: z.number().min(0, "Price must be positive"),

  // Distance and duration (calculated or manual)
  distance: z.number().min(0).default(0),
  duration: z.number().min(0).default(0),

  // Passengers - array of user IDs
  passengerIds: z
    .array(z.string())
    .min(1, "Please select at least one passenger"),

  // Rules - array of rule IDs
  ruleIds: z.array(z.string()).default([]),
});

export type AddRideInput = z.infer<typeof addRideSchema>;

export const addRideErrorMap = (): Partial<
  Record<keyof AddRideInput, string>
> => {
  return {
    driverId: "Please select a driver",
    carId: "Please select a car",
    from: "Please select departure location",
    to: "Please select destination",
    departure: "Please select departure time",
    price: "Please enter a valid price",
    passengerIds: "Please select at least one passenger",
  };
};

export const addRideErrorMapClient = addRideErrorMap();

export default addRideSchema;
