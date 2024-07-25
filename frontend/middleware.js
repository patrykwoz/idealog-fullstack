import { auth } from "@/auth"

export async function middleware(request) {
    let session = await auth()
    let currentUser = session?.user

    if (currentUser && !request.nextUrl.pathname.startsWith('/workspace')) {
        return Response.redirect(new URL('/workspace', request.url))
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}