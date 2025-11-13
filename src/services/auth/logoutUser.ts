"use server";

import { deleteCookie } from "@/services/auth/tokenHandlers";
import { redirect } from "next/navigation";


export const logoutUser = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    redirect("/login?loggedOut=true");
};