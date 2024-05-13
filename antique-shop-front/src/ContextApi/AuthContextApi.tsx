import { createContext, useContext, ReactNode } from 'react';
import { ApiService } from '../ApiService/ApiServiceAntique';
import { useUserInfo } from '../Hooks/context.hooks';

interface AuthContextType {
    isAuthenticated: boolean,
    setToken: (token: string) => void,
    apiService: ApiService,
    isAdmin: boolean,
    setIsAuthenticated: (t: boolean) => void,
    userId: number,
    requested: boolean,
    setRequested: (t: boolean) => void
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { isAuthenticated, isAdmin, setToken, setIsAuthenticated, userId, apiService, requested ,setRequested} = useUserInfo();

    return (
        <AuthContext.Provider value={{ isAuthenticated, setToken, apiService, isAdmin, setIsAuthenticated, userId, requested, setRequested }} >
            {children}
        </AuthContext.Provider >
    );
}

export const useAuth = () => useContext(AuthContext);
