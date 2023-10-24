import { any, record, z } from "zod";

export const NewsSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(5).max(50),
  description: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  image: record(any()).nullable(),
});
