export type UserRole = 'ADMIN' | "PATIENT" | "DOCTOR";

export type RouteConfig = {
    exact: string[];
    patterns: RegExp[];
};

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    patterns: [] // [/password/change-password, /password/reset-password]
};

export const doctorProtectedRoutes: RouteConfig = {
    patterns: [/^\/doctor/], // Routes starting with /doctor/*, /assistants/*
    exact: [] // "/assistants"
};

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*, /assistants/*
    exact: [] // "/admin"
};

export const patientProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], // Routes starting with /admin/*, /assistants/*
    exact: [] // "/dashboard"
};

export const isAuthRoute = (pathname: string): boolean => {
    return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    };

    return routes.patterns.some((pattern) => pattern.test(pathname));
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
};

export const getRouteOwner = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    };
    if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "DOCTOR";
    };
    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "PATIENT";
    };
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    };
    return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard"
    };
    if (role === "DOCTOR") {
        return "/doctor/dashboard"
    };
    if (role === "PATIENT") {
        return "/dashboard"
    };
    return "/";
};

export const isValidRedirectForRole = (redirectPath: string, userRole: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    };

    if (routeOwner === userRole) {
        return true;
    };

    return false;
}