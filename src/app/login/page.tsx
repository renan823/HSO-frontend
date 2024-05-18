"use client"

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login () {
    const { user, authenticate } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    async function handleLogin () {
        if (email.trim().length !== 0 && password.trim().length !== 0) {
            await authenticate(email, password);
        } else {
            toast.error("Preencha corretamente os campos");
        }
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
        <div className="flex-col w-3/6 p-6 bg-slate-800 rounded-lg">
            <div>
                <h1 className="text-3xl text-violet-700 underline font-bold">Entre na sua conta</h1>
            </div>
            <div className="py-4">
                <div className="m-2">
                    <label className="text-violet-500 text-lg font-bold">Email:</label>
                    <div>
                        <input className="w-2/3 p-2 rounded-md shadow-sm shadow-slate-500 text-lg font-bold" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="off"/>
                    </div>
                </div>
                <div className="m-2">
                    <label className="text-violet-500 text-lg font-bold">Senha:</label>
                    <div>
                        <input className="w-2/3 p-2 rounded-md shadow-sm shadow-slate-500 text-lg font-bold" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                </div>
                <div className="flex justify-end px-5">
                    <button className="bg-violet-700 px-10 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800" onClick={handleLogin}>
                        <p className="text-lg text-white font-bold text-center">Fazer login</p>
                    </button>
                </div>
            </div>
        </div>
    )
}