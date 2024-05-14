import Link from "next/link";

export default function PermissionBanner () {
    return (
        <div className="bg-slate-800 p-5 rounded-md m-2">
            <h1 className="text-2xl text-white font-bold text-center">Você não tem permissão para acessar esta função</h1>
            <h2 className="text-xl text-white font-bold text-center">Tente fazer <Link href="/login" className="text-violet-700 underline">login</Link> para continuar</h2>
        </div>
    )
}