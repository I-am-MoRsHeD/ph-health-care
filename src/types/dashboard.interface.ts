import { UserRole } from "@/lib/auth-utils";

export interface ISidebarNavLink {
    title: string;
    href: string;
    icon: string;
    badge?: string | number;
    description?: string;
    roles: UserRole[];
};

export interface ISidebarNavSection {
    title?: string;
    items: ISidebarNavLink[];
}