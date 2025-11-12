'use client';

import { Button } from "../ui/button";
import { logoutUser } from "@/services/auth/logoutUser";


const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <Button variant={"destructive"}
            className="w-full"
            onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;