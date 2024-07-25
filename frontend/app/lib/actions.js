'use server'

import { signIn, auth } from '@/auth'
import { fetchIdeas, fetchIdeasNoToken } from '@/app/client/api_actions'

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

export async function getIdeas(){
    const session = await auth()
    console.log('SESSION',session);
    const accessToken = session.user.accessToken
    console.log('ACCESS TOKEN',accessToken);
    try{
        const ideas = await fetchIdeasNoToken()
        console.log('IDEAS',ideas);
        return ideas
    }
    catch(error){
        console.log(error)
        throw error
    }
}

// const session = await getSession();
// const userRole = session?.user?.role;