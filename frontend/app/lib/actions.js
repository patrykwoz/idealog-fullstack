'use server'

import { signIn, signOut, auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'
import {
    updateUserApi,
    fetchIdeas,
    createIdeaApi,
    fetchRelationships,
    createRelationshipApi,
    fetchNodes,
    fetchNode,
    createKnowledgeApi,
    currentUser,
} from '@/app/client/api_actions'

export async function login(formData) {
    try {
        const signinObj = {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        };

        await signIn("credentials", signinObj);

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
        console.error('Error logging in');
    }
    redirect('/workspace');
}

export async function logout() {
    try {
        await signOut({ redirect: false })
    } catch (error) {
        console.error('Error logging out');
    }
    redirect('/auth/login');
}

export async function updateUser(formData) {
    const rawFormData = {
        full_name: formData.get('userFullName'),
        email: formData.get('userEmail'),
        image_url: formData.get('userImageUrl'),
    }

    const autObj = await auth();
    const accessToken = autObj.accessToken;

    try {
        await updateUserApi(accessToken, rawFormData)
    }
    catch (error) {
        console.error('Error updating user');
    }
    revalidateTag('nodes');
}

export async function getCurrentUser() {
    const autObj = await auth();
    const accessToken = autObj.accessToken;
    try {
        const user = await currentUser(accessToken)
        return user
    }
    catch (error) {
        console.error('Error getting current user');
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
        console.error('Error getting ideas');
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
        const response = await createIdeaApi(accessToken, rawFormData)
        if (response.success) {
            revalidateRelationships();
            revalidateNodes();
            return response;
        } else {
            return response;
        }

    }
    catch (error) {
        console.error('Error creating idea');
    }
}

export async function getRelationships() {
    const autObj = await auth();
    const accessToken = autObj.accessToken;

    try {
        const relations = await fetchRelationships(accessToken)
        return relations
    }
    catch (error) {
        console.error('Error getting relationships');
    }
}

export async function createRelationship(formData) {
    const rawFormData = {
        name: formData.get('relationshipName'),
        head: formData.get('relationshipHead'),
        tail: formData.get('relationshipTail'),
        rel_type: formData.get('relationshipType'),
    }

    const autObj = await auth();
    const accessToken = autObj.accessToken;
    try {
        const response = await createRelationshipApi(accessToken, rawFormData)
        revalidateRelationships();
        revalidateNodes();
        return response
    }
    catch (error) {
        console.error('Error creating relationship');
    }
}

export async function createKnowledge(formData) {
    const rawFormData = {
        name: formData.get('knowledgeTitle'),
        url: formData.get('knowledgeUrl'),
        summary: formData.get('knowledgeSummary'),
        full_text: formData.get('knowledgeText'),
        use_ml: formData.get('useMl') === 'on',
    }
    const autObj = await auth();
    const accessToken = autObj.accessToken;
    try {
        const response = await createKnowledgeApi(accessToken, rawFormData)
        if (response.success) {
            revalidateRelationships();
            revalidateNodes();
            return response
        }
        else {
            return response
        }
    }
    catch (error) {
        console.error('Error creating knowledge source');
    }
}

export async function getNodes(queryParams = {}) {
    const autObj = await auth();
    const accessToken = autObj.accessToken;

    try {
        const nodes = await fetchNodes(accessToken, queryParams)
        return nodes
    }
    catch (error) {
        console.error('Error getting nodes');
    }
}

export async function getNode(neo4jId) {
    const autObj = await auth();
    const accessToken = autObj.accessToken;
    try {
        const node = await fetchNode(accessToken, neo4jId)
        return node[0]
    }
    catch (error) {
        console.error('Error getting node');
    }
}

export async function searchNodes(value) {
    const autObj = await auth();
    const accessToken = autObj.accessToken;

    const queryParams = {
        search: value,
    }

    try {
        const nodes = await fetchNodes(accessToken, queryParams)
        return nodes
    }
    catch (error) {
        console.error('Error searching nodes');
    }
}

export async function revalidateNodes() {
    revalidateTag('nodes');
}

export async function revalidateRelationships() {
    revalidateTag('relationships');
}