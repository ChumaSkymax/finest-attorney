import z from "zod";

const teamDataSchema = z.object({
  _id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  image: z.string(),
  role: z.string().min(3, "Role must be at least 3 characters long"),
});

export default teamDataSchema;
