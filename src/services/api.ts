import {useAuth} from '@/contexts/AuthContext';
import {API_CONFIG} from '@/config/apiConfig';
import {mockApiService} from '@/mock/mockData';

const API_BASE_URL = API_CONFIG.API_BASE_URL;

// Function to check if a response is a JSON response
const isJsonResponse = (response: Response) => {
    const contentType = response.headers.get('content-type');
    return contentType && contentType.indexOf('application/json') !== -1;
};

// Helper function to handle API response
const handleResponse = async (response: Response) => {
    // For 'no-cors' mode, we might get an opaque response
    if (response.type === 'opaque') {
        // Return a default success response since we can't read the actual response
        return {isSuccess: true};
    }
    const data = await (isJsonResponse(response) ? response.json() : response.text());
    if (!response.ok) {
        // Convert the error message or object to string
        const errorMessage = typeof data === 'object' ? JSON.stringify(data) : data;
        throw new Error(errorMessage || response.statusText);
    }
    return data;
};

// Create the API service
export const createApiService = (getToken: () => string | null) => {
    // If we're in mock mode, return the mock API service
    if (API_CONFIG.MODE === 'mock') {
        if (API_CONFIG.ENABLE_LOGS) {
            console.log('Using mock API service');
        }
        return mockApiService;
    }

    // Otherwise, use the real API service
    if (API_CONFIG.ENABLE_LOGS) {
        console.log('Using real API service');
    }

    const getAuthHeaders = () => {
        const token = getToken();
        return token ? {Authorization: `Bearer ${token}`} : {};
    };
    // Reusable fetch function with auth headers
    const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
        const url = API_BASE_URL + endpoint;
        const headers = {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
            ...options.headers,
        };

        if (API_CONFIG.ENABLE_LOGS) {
            console.log(`API Request: ${url}`, options);
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            return handleResponse(response);
        } catch (error) {
            console.error("API request failed:", error);
        }
    };

    // Authentication API calls
    const auth = {
        register: async (username: string, password: string) => {
            return fetchWithAuth('/users', {
                method: 'POST',
                body: JSON.stringify({username, password}),
            });
        },

        login: async (username: string, password: string) => {
            return fetchWithAuth('/auth/login', {
                method: 'POST',
                body: JSON.stringify({username, password}),
            });
        },
    };

    // Todo API calls
    const todos = {
        getAll: async () => {
            return fetchWithAuth('/todo/all');
        },

        create: async (title: string, description: string) => {
            return fetchWithAuth('/todo', {
                method: 'POST',
                body: JSON.stringify({title, description}),
            });
        },

        update: async (id: string, title: string, description: string) => {
            return fetchWithAuth(`/todo/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({title, description}),
            });
        },

        delete: async (id: string) => {
            return fetchWithAuth(`/todo/${id}`, {
                method: 'DELETE',
            });
        },
    };

    return {
        auth,
        todos,
    };
};

// Hook to use the API service with auth context
export const useApiService = () => {
    const {token} = useAuth();
    return createApiService(() => token);
};
