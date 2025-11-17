/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";


const registerValidateZodSchema = z.object({
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

export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            password: formData.get("password"),
            patient: {
                name: formData.get('name'),
                address: formData.get('address'),
                email: formData.get('email'),
                contactNumber: formData.get('contact-number')
            }
        };

        if (zodValidators(payload, registerValidateZodSchema).success === false) {
            return zodValidators(payload, registerValidateZodSchema);
        }

        const validatedPayload = zodValidators(payload, registerValidateZodSchema);

        const registerData = {
            password: validatedPayload?.data?.password,
            patient: {
                name: validatedPayload.data?.name,
                address: validatedPayload?.data?.address,
                email: validatedPayload?.data?.email,
                contactNumber: validatedPayload?.data?.contactNumber
            }
        };

        const newFormData = new FormData(); // registerData ta amdr moto kore format korte  hoyeche,tai new formData kore arekta formData create korte hoyeche!

        newFormData.append('data', JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const res = await serverFetch.post(`/user/create-patient`, {
            method: "POST",
            body: newFormData
        });

        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
        return { error: "Registration failed!" }
    }
};