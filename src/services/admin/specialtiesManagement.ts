/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import z from "zod";

const createSpecialityZodSchema = z.object({
    title: z.string({
        error: "Title is required"
    }).min(3, {
        error: "Title must be at least 3 characters long"
    })
})

export const createSpeciality = async (_prevState: any, formData: FormData) => {
    try {
        const payload = {
            title: formData.get('title')
        };

        const validatedPayload = zodValidators(payload, createSpecialityZodSchema);

        if (validatedPayload.success === false) {
            return zodValidators(payload, createSpecialityZodSchema);
        }

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(validatedPayload.data))

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        };

        const res = await serverFetch.post('/specialties', {
            body: newFormData
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || "Something went wrong!"
        }
    }
};

export const getSpecialities = () => { };

export const deleteSpeciality = () => { };