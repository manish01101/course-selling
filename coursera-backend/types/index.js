import { z } from "zod";

export const userSchemaType = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(20),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export const courseSchemaType = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  imageLink: z.string().optional(),
  published: z.boolean().optional(),
});
