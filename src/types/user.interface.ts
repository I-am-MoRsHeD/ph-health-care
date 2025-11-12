import { UserRole } from "@/lib/auth-utils";


export interface IUser {
    name: string;
    email: string;
    role: UserRole
};