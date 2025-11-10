'use client';
import { deleteCookie } from "@/lib/tokenHandlers";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";


const LogoutUser = () => {
    const handleLogout = async () => {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");

        redirect("/login");
    };

    return (
        <Button variant={"destructive"}
            onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutUser;