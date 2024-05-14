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
        <div className="flex flex-col p-4 justify-center">
            <h1 className="text-2xl text-white font-bold">*futuro formulário de login</h1>
            <button className="bg-violet-700 px-10 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800" onClick={handleLogin}>
                <p className="text-lg text-white font-bold text-center">Fazer login</p>
            </button>
        </div>
    )
}