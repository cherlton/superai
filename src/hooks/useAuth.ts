import { useState, useCallback } from 'react';
import API_BASE_URL from '../env';
interface AuthResponse {
    token: string;
}

interface AuthError {
    error: string;
}

interface UseAuthReturn {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(() => {
        // Initialize from localStorage if available
        return localStorage.getItem('auth_token');
    });

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data: AuthResponse | AuthError = await response.json();

            if (!response.ok) {
                const errorMessage = (data as AuthError).error || 'Login failed';
                setError(errorMessage);
                setIsLoading(false);
                return { success: false, error: errorMessage };
            }

            const authToken = (data as AuthResponse).token;
            setToken(authToken);
            localStorage.setItem('auth_token', authToken);
            setIsLoading(false);
            return { success: true };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
            setError(errorMessage);
            setIsLoading(false);
            return { success: false, error: errorMessage };
        }
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data: AuthResponse | AuthError = await response.json();

            if (!response.ok) {
                const errorMessage = (data as AuthError).error || 'Registration failed';
                setError(errorMessage);
                setIsLoading(false);
                return { success: false, error: errorMessage };
            }

            const authToken = (data as AuthResponse).token;
            setToken(authToken);
            localStorage.setItem('auth_token', authToken);
            setIsLoading(false);
            return { success: true };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
            setError(errorMessage);
            setIsLoading(false);
            return { success: false, error: errorMessage };
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('auth_token');
    }, []);

    return {
        login,
        register,
        logout,
        isLoading,
        error,
        token,
        isAuthenticated: !!token,
    };
};

export default useAuth;