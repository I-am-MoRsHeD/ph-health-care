/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { setCookie } from "@/services/auth/tokenHandlers";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
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
        const callbackUrl = formData.get("callbackUrl") || null;
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
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
        };

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-type": "application/json"
            }
        });

        const result = await res.json();

        const setCookiesHeaders = res.headers.getSetCookie();

        if (setCookiesHeaders && setCookiesHeaders.length > 0) {
            setCookiesHeaders.forEach((cookie) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                };
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                };
            })
        } else {
            throw new Error("No set-cookie headers found");
        };

        if (!accessTokenObject && !refreshTokenObject) {
            throw new Error("Tokens are missing in cookies");
        };

        await setCookie('accessToken', accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
            path: accessTokenObject.Path,
            sameSite: accessTokenObject.SameSite || "none"
        });
        await setCookie('refreshToken', refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path,
            sameSite: refreshTokenObject.SameSite || "none"
        });

        const verifiedUser: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_ACCESS_SECRET as string);

        if (verifiedUser && typeof verifiedUser === "string") {
            throw new Error("Invalid token payload");
        };

        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }

        const userRole: UserRole = (verifiedUser as JwtPayload).role as UserRole;

        if (callbackUrl) {
            if (isValidRedirectForRole(callbackUrl.toString(), userRole)) {
                redirect(`${callbackUrl.toString()}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }


    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: error.message || "Login failed! Wrong credentials."
        }
    }
};

