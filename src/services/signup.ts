import { api } from '@/lib/api';
import axios from 'axios';

interface SignupCredentials {
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignupResponse {
    message: string;
    token?: string;
}

export const signup = async (credentials: SignupCredentials): Promise<SignupResponse> => {
    try {
        const response = await api.post('/signup', credentials);
        return {
            message: response.data.message,
            token: response.data.token,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                message: error.response.data.message || 'Signup failed',
            };
        } else {
            return {
                message: 'An unexpected error occurred',
            };
        }
    }
};
