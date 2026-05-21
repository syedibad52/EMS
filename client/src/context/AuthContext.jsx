/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const refreshSession = async () => {
        try {
            const { data } = await api.get("/auth/session")
            setUser(data.user)
        } catch {
            localStorage.removeItem("token")
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        refreshSession()
    },[])

    const login = async (email, password, role_type) => {
        const { data } = await api.post("/auth/login", {email, password, role_type})
        localStorage.removeItem("token")
        setUser(data.user);
        return data.user;
    }

    const logout = async ()=>{
        try {
            await api.post("/auth/logout")
        } catch (error) {
            console.warn("Logout request failed", error)
        }
        localStorage.removeItem("token")
        setUser(null);
    }

    const value = {user, loading, login, logout, refreshSession}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}