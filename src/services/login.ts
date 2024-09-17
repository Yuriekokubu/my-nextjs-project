import { api } from '@/lib/api'; // Ensure this path is correct
import axios from 'axios';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    token?: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await api.post('/login', credentials);
        // Handle success
        return {
            message: response.data.message,
            token: response.data.token,
        };
    } catch (error) {
        // Handle error
        if (axios.isAxiosError(error) && error.response) {
            return {
                message: error.response.data.message || 'Login failed',
            };
        } else {
            return {
                message: 'An unexpected error occurred',
            };
        }
    }
};
