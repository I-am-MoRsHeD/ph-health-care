/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getCookie } from "@/lib/tokenHandlers";
import { IUser } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";


export const getUserInfo = async (): Promise<IUser | null> => {
    try {
        const accessToken = await getCookie('accessToken');

        if (!accessToken) {
            return null;
        };

        const verifiedUser = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

        if (!verifiedUser) {
            return null;
        };

        const userInfo: IUser = {
            name: verifiedUser.name || "Unknown user",
            email: verifiedUser.email,
            role: verifiedUser.role
        };

        return userInfo;

    } catch (error: any) {
        console.log(error);
        throw new Error('Failed to get user info', { cause: error });
    }
};