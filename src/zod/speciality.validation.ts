import z from "zod";


export const createSpecialityZodSchema = z.object({
    title: z.string({
        error: "Title is required"
    }).min(3, {
        error: "Title must be at least 3 characters long"
    })
})
