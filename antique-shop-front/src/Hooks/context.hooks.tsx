import { useEffect, useState } from "react";
import { ApiService } from "../ApiService/ApiServiceAntique";
import { jwtDecode } from "jwt-decode";
import { userRole } from "../utils/constants";

const apiService = new ApiService();

export function useUserInfo() {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const isTokenValid = async () => {
            const token: any = localStorage.getItem('token')
            if (!token) {
                setIsAdmin(false)
                setIsAuthenticated(false)
                return;
            }
            apiService.setToken(token)
            const result = await apiService.isTokenValid()
            if (!result) {
                setIsAuthenticated(false)
            }
            setIsAuthenticated(true);
            const decodedToken: any = jwtDecode(token);
            setUserId(decodedToken.id)
            const isAdmin = decodedToken.role === userRole.Admin;
            setIsAdmin(isAdmin);
        }
        isTokenValid()
    }, [])

    const setToken = async (token: string) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true);
        const decodedToken: any = jwtDecode(token);
        const isAdmin = decodedToken.role === userRole.Admin;
        setIsAdmin(isAdmin);
    }
    return { isAuthenticated, isAdmin, setToken, setIsAuthenticated, userId, apiService };
}