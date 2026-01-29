import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import API_BASE_URL from '../env';

interface DashboardStats {
    activeTrends: number;
    sentimentAnalyzed: number;
    learningPaths: number;
    opportunities: number;
    trendsChange: string;
    sentimentChange: string;
    pathsChange: string;
    opportunitiesChange: string;
}

export interface RecentActivity {
    id: number;
    type: 'trend' | 'opinion' | 'skill';
    title: string;
    description: string;
    icon: string;
    timestamp: string;
    timeAgo: string;
}

interface AuthContextType {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    loginWithGoogle: (token: string) => Promise<{ success: boolean; error?: string }>;
    loginWithGithub: (code: string) => Promise<{ success: boolean; error?: string }>;
    getProfile: () => Promise<{ success: boolean; data?: any; error?: string }>;
    updateProfile: (email: string) => Promise<{ success: boolean; error?: string }>;
    updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
    deleteAccount: () => Promise<{ success: boolean; error?: string }>;
    analyzeTrends: (topic: string) => Promise<{ success: boolean; data?: any; error?: string }>;
    analyzeOpinion: (topic: string) => Promise<{ success: boolean; data?: any; error?: string }>;
    buildSkillPath: (skill: string) => Promise<{ success: boolean; data?: any; error?: string }>;
    getDashboardStats: () => Promise<{ success: boolean; data?: DashboardStats; error?: string }>;
    getRecentActivities: (limit?: number) => Promise<{ success: boolean; data?: RecentActivity[]; error?: string }>;
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

    const loginWithGoogle = useCallback(async (googleToken: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/google`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${googleToken}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.error || 'Google login failed';
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

    const loginWithGithub = useCallback(async (githubCode: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/github`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: githubCode }),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.error || 'GitHub login failed';
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

    const getProfile = useCallback(async () => {
        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Handle 422 (token validation failed) - clear invalid token
            if (response.status === 422) {
                console.warn('Token validation failed (422). Clearing stale token.');
                setToken(null);
                localStorage.removeItem('auth_token');
                return { success: false, error: 'Session expired. Please log in again.' };
            }

            const data = await response.json();
            if (!response.ok) return { success: false, error: data.error };
            return { success: true, data };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token]);

    const updateProfile = useCallback(async (email: string) => {
        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (!response.ok) return { success: false, error: data.error };
            return { success: true };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token]);

    const updatePassword = useCallback(async (current_password: string, new_password: string) => {
        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/users/me/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ current_password, new_password })
            });
            const data = await response.json();
            if (!response.ok) return { success: false, error: data.error };
            return { success: true };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token]);

    const analyzeTrends = useCallback(async (topic: string) => {
        console.log("TOKEN BEING SENT:", token);

        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/trends/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ topic })
            });
            const data = await response.json();
            if (!response.ok) return { success: false, error: data.error || 'Failed to analyze trends' };
            return { success: true, data };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token]);

    const analyzeOpinion = useCallback(async (topic: string) => {
        console.log("Analyzing opinion for:", topic);

        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/opinions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ topic })
            });
            const data = await response.json();
            if (!response.ok) return { success: false, error: data.error || 'Failed to analyze opinion' };
            return { success: true, data };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token]);

    const buildSkillPath = useCallback(async (skill: string) => {
        console.log("Building skill path for:", skill);

        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/skills/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ skill })
            });
            const data = await response.json();
            if (!response.ok) return { success: false, error: data.error || 'Failed to build skill path' };
            return { success: true, data };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token]);

    const getDashboardStats = useCallback(async () => {
        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) {
                // If endpoint doesn't exist, return mock data for now
                return {
                    success: true,
                    data: {
                        activeTrends: 0,
                        sentimentAnalyzed: 0,
                        learningPaths: 0,
                        opportunities: 0,
                        trendsChange: '+0%',
                        sentimentChange: '+0%',
                        pathsChange: '+0%',
                        opportunitiesChange: '+0%'
                    }
                };
            }
            return { success: true, data };
        } catch (err) {
            // Return zeroed stats on error
            return {
                success: true,
                data: {
                    activeTrends: 0,
                    sentimentAnalyzed: 0,
                    learningPaths: 0,
                    opportunities: 0,
                    trendsChange: '+0%',
                    sentimentChange: '+0%',
                    pathsChange: '+0%',
                    opportunitiesChange: '+0%'
                }
            };
        }
    }, [token]);

    const getRecentActivities = useCallback(async (limit: number = 10) => {
        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/recent-activities?limit=${limit}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) return { success: false, error: data.error || 'Failed to fetch activities' };
            return { success: true, data: data.activities };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token]);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('auth_token');
    }, []);

    const deleteAccount = useCallback(async () => {
        if (!token) return { success: false, error: 'No token' };
        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                const data = await response.json();
                return { success: false, error: data.error };
            }
            logout();
            return { success: true };
        } catch (err) {
            return { success: false, error: 'Network error' };
        }
    }, [token, logout]);

    return (
        <AuthContext.Provider value={{
            login,
            register,
            loginWithGoogle,
            loginWithGithub,
            getProfile,
            analyzeTrends,
            analyzeOpinion,
            buildSkillPath,
            getDashboardStats,
            getRecentActivities,
            updateProfile,
            updatePassword,
            deleteAccount,
            logout,
            isLoading,
            error,
            token,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
