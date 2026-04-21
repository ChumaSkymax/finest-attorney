import z from "zod";

const teamDataSchema = z.object({
  _id: z.string().min(3, "ID must be at least 3 characters long"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  role: z.string().min(3, "Role must be at least 3 characters long"),
  image: z.string().url({ message: "Image must be a URL" }),
});

export default teamDataSchema;
