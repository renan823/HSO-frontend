"use client"

import { useState } from "react";

interface ViewProps {
    thesaurus: {
        [Key: string]: string[]
    }
}


export default function View ({ thesaurus }: ViewProps) {

    if (!thesaurus) {
        return (
            <div>
                <h2>Nada aqui!</h2>
            </div>
        )
    }

    const [search, setSearch] = useState("");

    return (
        <div className="mt-10 h-fit w-full bg-slate-800 rounded-lg p-8 items-center">
            <div className="flex w-full gap-10">
                <div className="py-2 px-6 flex w-fit rounded-md bg-slate-700 mb-8 items-center">
                    <h1 className="text-2xl text-white font-bold">Thesaurus completo</h1>
                </div>
                <div className="py-2 px-6 flex gap-4 w-fit rounded-md bg-slate-700 mb-8 whitespace-nowrap items-center">
                    <h2 className="text-xl text-violet-500 font-bold">Buscar palavra</h2>
                    <input type="search" onChange={(event) => setSearch(event.target.value)} autoComplete="off" className="bg-white py-2 px-4 w-full font-bold rounded-sm shadow-md shadow-slate-600"/>
                </div>
                <div className="py-2 px-6 mb-8">
                    <button onClick={() => alert("Ainda não tá pronto")} className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                        <p className="text-lg text-white font-bold text-center">Ver conexões</p>
                    </button>
                </div>
            </div>
            <div className="my-5">
                <table className="w-full table-fixed">
                    <thead className="bg-violet-800 p-4 rounded-md w-full">
                        <tr>
                            <th className="p-4 text-xl font-bold text-white text-left">Palavra</th>
                            <th className="p-4 text-xl font-bold text-white text-left">Sinônimos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(thesaurus).map(([word, synonyms], index) => {
                                if (word.includes(search) || synonyms.join("; ").includes(search)) {
                                    return (
                                        <tr key={index} className="border-b-2 border-violet-500 ease-in-out hover:bg-slate-700">
                                            <td className="text-left py-3 px-4 font-bold text-slate-400 text-lg">{word}</td>
                                            <td className="text-left py-3 px-4 font-bold text-slate-400 text-lg">{synonyms.join("; ")}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                </table>
            </div>
        </div>
    )
}