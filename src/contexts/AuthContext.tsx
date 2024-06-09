"use client"

import api from "@/services/api";
import { SignupUserInterface, UserInterface } from "@/services/interfaces";
import store from "@/services/store";
import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextProps {
    user: UserInterface | null, 
    setUser: Dispatch<SetStateAction<UserInterface | null>>,
    authenticate: (email: string, password: string) => void,
    register: (user: SignupUserInterface) => void
}

const AuthContext = createContext<AuthContextProps>({ 
    authenticate: () => {}, 
    user: null, 
    setUser: () => {}, 
    register: () => {} });

export function useAuth () {
    return useContext(AuthContext);
}

export default function AuthProvider ({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserInterface | null>(null);
    
    async function authenticate (email: string, password: string): Promise<void> {
        try {
            const response = await api.post("/users/auth/login", { email, password });

            if (response.status === 200) {
                setUser({ ...response.data.user });
                store.getState().setToken(response.data.token);
                store.getState().setRefresh(response.data.refresh);
                toast.success("Você está logado");
            } else {
                toast.error(response.data.message ?? "Algo deu errado");
            }
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Algo deu errado");
        }
    }

    async function register (user: SignupUserInterface): Promise<void> {
        try {
            const response = await api.post("/users/new", { user });

            if (response.status === 201) {
                
                toast.success("Usuário criado");
            } else {
                toast.error(response.data.message ?? "Algo deu errado");
            }
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Algo deu errado");
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, authenticate, register }}>
            { children }
        </AuthContext.Provider>
    )
}