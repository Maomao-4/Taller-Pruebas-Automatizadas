import { z } from "zod";

export const TodoSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    completed: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateTodoSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
    description: z.string().max(500, "Description too long").optional(),
    completed: z.boolean().optional(),
})

export const UpdateTodoSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title too long").optional(),
    description: z.string().max(500, "Description too long").optional(),
    completed: z.boolean().optional(),
})

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoRequest = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoRequest = z.infer<typeof UpdateTodoSchema>;