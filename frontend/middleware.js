// export { auth as middleware} from "@/auth"
import { auth } from "@/auth"
import { NextResponse } from 'next/server'

export default auth((request)=> {

    if (request.auth && !request.nextUrl.pathname.startsWith('/workspace')) {
        return NextResponse.redirect(new URL('/workspace', request.url))
    }

    if (!request.auth && !request.nextUrl.pathname.startsWith('/auth/login')) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}