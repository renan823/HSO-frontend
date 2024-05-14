"use client"

import ServerRequest from "@/services/ServerRequest";
import { UserInterface } from "@/services/interfaces";
import { ReactNode, createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextProps {
    user: UserInterface | null, 
    setUser: Dispatch<SetStateAction<UserInterface | null>>,
    authenticate: (email: string, password: string) => void
}

const AuthContext = createContext<AuthContextProps>({ authenticate: () => {}, user: null, setUser: () => {} });

export function useAuth () {
    return useContext(AuthContext);
}

export default function AuthProvider ({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserInterface | null>(null);
    
    async function authenticate (email: string, password: string): Promise<void> {
        try {
            const request = new ServerRequest("post", "/users/auth/login", { email, password });

            const response = await request.handle();

            if (response.getStatus() === 200) {
                setUser({...response.getData().user, token: response.getData().token });
            } else {
                toast.error(response.getData().message || "Algo deu errado");
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.message || "Algo deu errado");
        }
    }

    async function refreshUserToken () {

    }

    return (
        <AuthContext.Provider value={{ user, setUser, authenticate }}>
            { children }
        </AuthContext.Provider>
    )
}