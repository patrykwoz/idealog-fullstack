'use server'

import { signIn } from '@/auth'

export async function authenticate(_currentState, formData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                case 'CallbackRouteError':
                    return 'Access token not found.'
                case 'Bad Request':
                    return 'User not found.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}


// const session = await getSession();
// const userRole = session?.user?.role;