const API_URL = 'http://localhost:8000';

//just ping the server and expect hellow world json back
export const pingServer = async () => {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
};
