"use client"

import PermissionBanner from "@/components/PermissionBanner";
import { useAuth } from "@/contexts/AuthContext";
import { Roles, SignupUserInterface } from "@/services/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup () {
    const { user, register } = useAuth();

    if (!user || user.role != Roles.ADM) {
        return (
            <PermissionBanner/>
        )
    }

    const [formData, setFormData] = useState<SignupUserInterface>({ 
        name: "",
        email: "",
        password: "",
        role: ""
    })

    async function handleSignup () {
        for (const value of Object.values(formData)) {
            if (value.trim().length === 0) {
                toast.error("Preencha corretamente os campos");
                return;
            }
        }

        await register(formData);

        setFormData({
            name: "",
            email: "",
            password: "",
            role: ""
        })
    }


    return (
        <div className="flex-col w-3/6 p-6 bg-slate-800 rounded-lg">
            <div>
                <h1 className="text-3xl text-violet-700 underline font-bold">Criar uma conta</h1>
            </div>
            <div className="py-4">
                <div className="m-2">
                    <label className="text-violet-500 text-lg font-bold">Nome:</label>
                    <div>
                        <input className="w-2/3 p-2 rounded-md shadow-sm shadow-slate-500 text-lg font-bold" type="text" value={formData.name} onChange={(event) => setFormData({...formData, name: event.target.value})} autoComplete="off"/>
                    </div>
                </div>
                <div className="m-2">
                    <label className="text-violet-500 text-lg font-bold">Email:</label>
                    <div>
                        <input className="w-2/3 p-2 rounded-md shadow-sm shadow-slate-500 text-lg font-bold" type="email" value={formData.email} onChange={(event) => setFormData({...formData, email: event.target.value})} autoComplete="off"/>
                    </div>
                </div>
                <div className="m-2">
                    <label className="text-violet-500 text-lg font-bold">Senha:</label>
                    <div>
                        <input className="w-2/3 p-2 rounded-md shadow-sm shadow-slate-500 text-lg font-bold" type="password" value={formData.password} onChange={(event) => setFormData({...formData, password: event.target.value})}/>
                    </div>
                </div>
                <div className="m-2">
                    <label className="text-violet-500 text-lg font-bold">Permissão:</label>
                    <div>
                        <select onChange={(event) => setFormData({...formData, role: event.target.value})}>
                            <option value={Roles.ADM}>Administrador</option>
                            <option value={Roles.USER}>Usuário padrão</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end px-5">
                    <button className="bg-violet-700 px-10 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800" onClick={handleSignup}>
                        <p className="text-lg text-white font-bold text-center">Cadastrar</p>
                    </button>
                </div>
            </div>
        </div>
    )
}