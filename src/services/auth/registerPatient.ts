/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import { registerPatientValidateZodSchema } from "@/zod/auth.validation";

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

        if (zodValidators(payload, registerPatientValidateZodSchema).success === false) {
            return zodValidators(payload, registerPatientValidateZodSchema);
        }

        const validatedPayload = zodValidators(payload, registerPatientValidateZodSchema);

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