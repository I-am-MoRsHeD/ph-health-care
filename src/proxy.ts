import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils';
import { deleteCookie, getCookie } from './lib/tokenHandlers';


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // const accessToken = request.cookies.get("accessToken")?.value || null;

    const accessToken = await getCookie("accessToken") || null;

    // const userRole = request.cookies.get("userRole")?.value as UserRole || null;
    let userRole: UserRole | null = null;

    if (accessToken) {
        const verifiedUser: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);

        if (verifiedUser && typeof verifiedUser === "string") {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return NextResponse.redirect(new URL('/login', request.url));
        };

        userRole = (verifiedUser as JwtPayload).role as UserRole;
    };

    const routeOwner = getRouteOwner(pathname);
    // path = /doctor/appointments => routeOwner = "DOCTOR"
    // path = /my-profile => routeOwner = "COMMON"
    // path = /login => null

    const isAuth = isAuthRoute(pathname);

    // Rule -1 : User is loggedin and trying to access an auth route, redirect to default dashboard
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    };

    // Rule -2 : User is trying to access open public route
    if (routeOwner === null) {
        return NextResponse.next();
    };

    if (!accessToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    };

    // Rule - 3 : User is trying to access a common protected route
    if (routeOwner === "COMMON") {
        return NextResponse.next();
    };

    // Rule - 4 : User is trying to access role based protected route
    if (routeOwner !== userRole) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    };



    return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
};
