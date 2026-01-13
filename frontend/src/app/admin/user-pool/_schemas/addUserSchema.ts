import { z } from "zod";

const addUserSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  mobileNumber: z.string().min(1).max(30),
  profileImg: z.string().url(),
  bio: z.string().optional().default(""),
  sex: z.enum(["MAN", "WOMAN", "OTHER"]).default("OTHER"),
});

export type AddUserInput = z.infer<typeof addUserSchema>;

export const addUserErrorMap = (): Partial<
  Record<keyof AddUserInput, string>
> => {
  return {
    name: "Please enter a valid name",
    email: "Please enter a valid email address",
    mobileNumber: "Please enter a valid mobile number",
    profileImg: "Please enter a valid profile image URL",
  };
};

export const addUserErrorMapClient = addUserErrorMap();

export default addUserSchema;
