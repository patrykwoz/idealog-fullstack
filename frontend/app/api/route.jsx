import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = cookies();
    let sideNavDisplayed = cookieStore.get('sideNavDisplayed');

    return Response.json({ value: sideNavDisplayed.value })
}

export async function POST() {
    const cookieStore = cookies();
    let sideNavDisplayed = cookieStore.get('sideNavDisplayed') ;
    let currentStatus = sideNavDisplayed.value === 'true';
    let newStatus = !currentStatus;

    cookies().set('sideNavDisplayed', newStatus);

    return Response.json({ value: newStatus });
}