import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import API_BASE_URL from '../env';

interface AuthContextType {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.error || 'Login failed';
                setError(errorMessage);
                setIsLoading(false);
                return { success: false, error: errorMessage };
            }
            const authToken = data.token;
            setToken(authToken);
            localStorage.setItem('auth_token', authToken);
            setIsLoading(false);
            return { success: true };
        } catch (err) {
            setError('Network error occurred');
            setIsLoading(false);
            return { success: false, error: 'Network error occurred' };
        }
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.error || 'Registration failed';
                setError(errorMessage);
                setIsLoading(false);
                return { success: false, error: errorMessage };
            }
            setIsLoading(false);
            return { success: true };
        } catch (err) {
            setError('Network error occurred');
            setIsLoading(false);
            return { success: false, error: 'Network error occurred' };
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('auth_token');
    }, []);

    return (
        <AuthContext.Provider value={{ login, register, logout, isLoading, error, token, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};