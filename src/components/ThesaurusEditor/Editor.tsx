import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import Card from "../Card";
import PermissionBanner from "../PermissionBanner";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

interface EditorProps {
    setThesaurus: Dispatch<SetStateAction<any>>
}

export default function Editor ({ setThesaurus }: EditorProps) {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="w-full flex justify-center">
                <PermissionBanner/>
            </div>
        )
    }

    const [word, setWord] = useState("");
    const [synonym, setSynonym] = useState("");
    const [removeWord, setRemoveWord] = useState("");

    async function handleAddSynonym () {
        if (word.trim().length !== 0 && synonym.trim().length !== 0) {
            const response = await api.post("/thesaurus/synonym/add", { word, synonym });

            setWord("");
            setSynonym("");

            if (response.status === 200) {
                setThesaurus(response.data.thesaurus);
                return toast.success(response.data.message);
            } else {
                return toast.error(response.data.message);
            }
        } else {
            return toast.error("Preencha corretamento os campos");
        }
    }

    async function handleRemoveSynonym () {
        if (word.trim().length !== 0 && synonym.trim().length !== 0) {
            const response = await api.post("/thesaurus/synonym/remove", { word, synonym });

            setWord("");
            setSynonym("");

            if (response.status === 200) {
                setThesaurus(response.data.thesaurus);
                return toast.success(response.data.message);
            } else {
                return toast.error(response.data.message)
            }
        } else {
            return toast.error("Preencha corretamento os campos");
        }
    }

    async function handleRemoveWord () {
        if (removeWord.trim().length !== 0) {
            const response = await api.post("/thesaurus/word/remove", { word: removeWord });

            setRemoveWord("");

            if (response.status === 200) {
                setThesaurus(response.data.thesaurus);
                return toast.success(response.data.message);
            } else {
                return toast.error(response.data.message)
            }
        } else {
            return toast.error("Digite a palavra corretamente");
        }
    }

    return (
        <div className="w-full">
            <div className="py-2 px-6 w-fit m-4 rounded-md bg-slate-700">
                <h1 className="text-2xl text-white font-bold">Edite o Thesaurus</h1>
            </div>
            <div className="flex w-full justify-evenly gap-5">
                <Card>
                    <div>
                        <h4 className="text-xl font-bold text-violet-500">Adicionar/Remover conexão</h4>
                        <form className="py-4">
                            <div className="my-1">
                                <label className="text-lg font-bold text-violet-500">Palavra</label>
                                <div>
                                    <input type="text" name="word" value={word} onChange={(event) => setWord(event.target.value)} autoComplete="off" className="bg-white py-2 px-4 w-full font-bold rounded-sm shadow-md shadow-slate-600"/>
                                </div>
                            </div>
                            <div className="my-1">
                                <label className="text-lg font-bold text-violet-500">Sinônimo</label>
                                <div>
                                    <input type="text" name="word" value={synonym} onChange={(event) => setSynonym(event.target.value)} autoComplete="off" className="bg-white py-2 px-4 w-full font-bold rounded-sm shadow-md shadow-slate-600"/>
                                </div>
                            </div>
                        </form>
                        <p className="text-white font-bold my-4">*Cuidado! Ao adicionar uma conexão, as palavras já conectadas irão se conectar ao membros inseridos</p>
                        <p className="text-white font-bold my-4">Exemplo: A-B e B-C -{">"} A-C</p>
                    </div>
                    <div className="flex justify-end mt-4 gap-10">
                        <button onClick={handleAddSynonym} className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                            <p className="text-lg text-white font-bold text-center">Adicionar</p>
                        </button>
                        <button onClick={handleRemoveSynonym} className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                            <p className="text-lg text-white font-bold text-center">Remover</p>
                        </button>
                    </div>
                </Card>
                <Card>
                   <div>
                        <h4 className="text-xl font-bold text-violet-500">Remover palavra:</h4>
                        <form className="py-4">
                            <div className="my-1">
                                <label className="text-lg font-bold text-violet-500">Palavra</label>
                                <div>
                                    <input type="text" name="word" value={removeWord} onChange={(event) => setRemoveWord(event.target.value)} autoComplete="off" className="bg-white py-2 px-4 w-full font-bold rounded-sm shadow-md shadow-slate-600"/>
                                </div>
                            </div>
                        </form>
                        <p className="text-white font-bold my-4">*Cuidado! Ao remover uma palavra, todas as suas conexões serão perdidas</p>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleRemoveWord} className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                            <p className="text-lg text-white font-bold text-center">Remover</p>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    )
}