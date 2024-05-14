"use client"

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function Login () {

    const [email, setEmail] = useState("jose@email.com");
    const [password, setPassword] = useState("1234");
    const { authenticate, user } = useAuth();

    async function handleLogin () {
        await authenticate(email, password);
    }

    if (user) {
        return (
            <div>
                <h1 className="text-2xl text-white font-bold">Você já está logado</h1>
                <h2 className="text-xl font-bold text-white">Volte para a <Link href="/" className="text-violet-500">página inicial</Link></h2>
            </div>
        )
    }


    return (
        <div>
            <h1>futuro formulário de login</h1>
            <button onClick={handleLogin}>logar</button>
        </div>
    )
}