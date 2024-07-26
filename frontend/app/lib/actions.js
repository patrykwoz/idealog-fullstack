'use server'

import { signIn, auth } from '@/auth'
import { fetchIdeas, fetchIdeasNoToken, fetchRelations, fetchNodes } from '@/app/client/api_actions'

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

export async function getIdeas() {
    try {
        const ideas = await fetchIdeasNoToken()
        return ideas
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export async function getRelations() {
    try {
        const relations = await fetchRelations()
        return relations
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export async function getNodes() {
    try {
        const nodes = await fetchNodes()
        return nodes
    }
    catch (error) {
        console.log(error)
        throw error
    }
}