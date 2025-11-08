/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import z from "zod";


const loginValidateZodSchema = z.object({
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

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const loginData = {
            email: formData.get('email'),
            password: formData.get("password"),
        };

        const validateFields = loginValidateZodSchema.safeParse(loginData);

        if (!validateFields.success) {
            return {
                success: false,
                error: validateFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                })
            }
        }

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json());

        return res;

    } catch (error) {
        console.log(error);
        return { error: "Login failed!" }
    }
};

