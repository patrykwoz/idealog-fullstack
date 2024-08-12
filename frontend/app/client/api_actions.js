'use server';
const BASE_URL = process.env.BASE_BACKEND_URL;
const API_PATH = process.env.API_PATH;
const API_URL = `${BASE_URL}${API_PATH}`;

export const getToken = async (email, password) => {
    const response = await fetch(`${API_URL}/login/access-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: email,
            password: password
        }).toString(),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const currentUser = async (accessToken) => {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const updateUserApi = async (accessToken, formData) => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}


export const fetchIdeas = async (accessToken) => {
    const response = await fetch(`${API_URL}/ideas`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const createIdeaApi = async (accessToken, formData) => {
    const response = await fetch(`${API_URL}/ideas`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        let errorDetail = 'Unknown error';
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail;
        } catch (error) {
            console.error('Error parsing error response');
        }
        return {
            success: false,
            status: response.status,
            statusText: response.statusText,
            detail: errorDetail,
        }
    }
    const data = await response.json();
    return {
        success: true,
        data
    };
}

export const fetchRelationships = async (accessToken) => {
    const response = await fetch(`${API_URL}/relationships`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { tags: ['relationships'] }
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const createRelationshipApi = async (accessToken, formData) => {
    const response = await fetch(`${API_URL}/relationships`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const createKnowledgeApi = async (accessToken, formData) => {
    const response = await fetch(`${API_URL}/knowledge_sources`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        return {
            success: false,
            status: response.status,
            statusText: response.statusText,
        };
    }
    const data = await response.json();
    return {
        success: true,
        data
    };
}

export const fetchNodes = async (accessToken, queryParams = {}) => {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${API_URL}/nodes${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { tags: ['nodes'] }
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const fetchNode = async (accessToken, neo4jId) => {
    const response = await fetch(`${API_URL}/nodes/${neo4jId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}