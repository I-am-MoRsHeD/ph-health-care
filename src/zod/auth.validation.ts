/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerPatientValidateZodSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters long"
    }).max(100, {
        message: "Name must be at most 100 characters long"
    }),
    address: z.string().optional(),
    email: z.email({
        error: "Email is required"
    }),
    contactNumber: z.string().min(10, {
        message: "Contact Number must be at least 10 characters long"
    }).max(15, {
        message: "Contact Number must be at most 15 characters long"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(100, {
        message: "Password must be at most 100 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"]
});


export const loginValidateZodSchema = z.object({
    email: z.email({
        error: "Email is required"
    }),
    password: z.string({
        error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters long"
    }).max(100, {
        message: "Password must be at most 100 characters long"
    })
})