import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const serverFetchHelper = async (endPoint: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options;

    const accessToken = await getCookie('accessToken');

    const response = await fetch(`${BACKEND_URL}/${endPoint}`, {
        headers: {
            ...headers,
            // ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
            // ...(accessToken ? { "Authorization": accessToken } : {}),
            Cookie: accessToken ? `accessToken=${accessToken}` : '',
        },
        ...restOptions
    });

    return response;
};

export const serverFetch = {
    get: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'GET', ...options }),

    post: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'POST', ...options }),

    put: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'PUT', ...options }),

    patch: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'PATCH', ...options }),

    delete: async (endPoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endPoint, { method: 'DELETE', ...options }),
};

/**
 * serverFetch.get('/auth/me');
 * serverFetch.post('/auth/login', { body: JSON.stringify({ username, password }) });
 */