'use server';
const BACKEND_URL = 'http://localhost:8000';
const API_VERSION = 'api/v1';
const API_URL = `${BACKEND_URL}/${API_VERSION}`;

//just ping the server and expect hellow world json back
export const pingServer = async () => {
    const response = await fetch(`${BACKEND_URL}`);
    if (!response.ok) {
        console.log(response.statusText);
    }
    const data = await response.json();
    return data;
};

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

export const fetchIdeasNoToken = async () => {
    const response = await fetch(`${API_URL}/ideas`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}