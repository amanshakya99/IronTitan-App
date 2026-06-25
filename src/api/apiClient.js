export const USE_MOCK =true;
export const BASE_URL = 'https://api.example.com';

export async function apiRequest(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const res = await fetch (url,{
        headers:{
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({message: res.statusText }));
        throw new Error(error.message || `Request failed with status ${res.status}`);
    }
    return res.json();
}