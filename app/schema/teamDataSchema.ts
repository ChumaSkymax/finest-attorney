import z from "zod";

const teamDataSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  position: z.string().min(3, "Position must be at least 3 characters long"),
  profileImage: z.instanceof(File, { message: "Profile Image is Required" }),
});

export default teamDataSchema;
