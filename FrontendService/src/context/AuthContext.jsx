import { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Helper to decode JWT (simplified for demo, better to use jwt-decode library)
    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Invalid token", e);
            return null;
        }
    };

    useEffect(() => {
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                // Ensure field mapping matches your JWT claims
                setUser({
                    username: decoded.sub,
                    email: decoded.email,
                    role: decoded.role,
                    name: decoded.name
                });
            } else {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await authApi.login({ email, password });
            const token = response.data;

            if (token) {
                localStorage.setItem('token', token);
                setToken(token);
                // The useEffect will handle setting the user from the token
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };
    const register = async (userData) => {
        try {
            await authApi.register(userData);
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
