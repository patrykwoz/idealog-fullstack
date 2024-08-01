'use server'

import { signIn, auth } from '@/auth'
import { revalidateTag } from 'next/cache'
import {
    fetchIdeas,
    createIdeaApi,
    fetchRelations,
    fetchNodes
} from '@/app/client/api_actions'

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
    const autObj = await auth();
    const accessToken = autObj.accessToken;

    try {
        const ideas = await fetchIdeas(accessToken)
        return ideas
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export async function createIdea(formData) {
    const rawFormData = {
        name: formData.get('ideaName'),
        description: formData.get('ideaDescription'),
    }
    const autObj = await auth();
    const accessToken = autObj.accessToken;
    
    try {
        const idea = await createIdeaApi( accessToken, rawFormData)
        revalidateNodes();
        return idea
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
    const autObj = await auth();
    const accessToken = autObj.accessToken;

    try {
        const nodes = await fetchNodes(accessToken)
        return nodes
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export async function revalidateNodes() {
    revalidateTag('nodes')
}