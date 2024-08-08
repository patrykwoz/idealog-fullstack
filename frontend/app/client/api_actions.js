'use server';
const BASE_URL = process.env.BASE_BACKEND_URL;
const API_PATH = process.env.API_PATH;
const API_URL = `${BASE_URL}${API_PATH}`;
export const getToken = async (email, password) => {
    console.log('GET TOKEN API_URL:', API_URL);
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
        console.log(response.statusText);
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
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}


export const fetchIdeasNoToken = async () => {
    const response = await fetch(`${API_URL}/ideas`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const fetchRelationships = async () => {
    const response = await fetch(`${API_URL}/relationships`,
        {
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
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const fetchNodes = async (accessToken, queryParams = {}) => {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${API_URL}/nodes${queryString ? `?${queryString}` : ''}`;

    console.log('URL:',url);  

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