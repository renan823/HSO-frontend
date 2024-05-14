import ServerRequest from "@/services/ServerRequest";
import { DataframeInterface } from "@/services/interfaces";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import Card from "../Card";
import { useAuth } from "@/contexts/AuthContext";
import PermissionBanner from "../PermissionBanner";

interface EditorProps {
    filename: string
    dataframe: DataframeInterface | undefined,
    setDataframe: Dispatch<SetStateAction<DataframeInterface | undefined>>
}

export default function Editor ({ filename, dataframe, setDataframe }: EditorProps) {
    const { user } = useAuth();

    if (!filename || filename.trim().length === 0) {
        return (
            <div className="flex justify-center w-full">
                <h1 className="text-center text-lg text-white font-bold">Nenhum dataframe foi escolhido</h1>
            </div>
        )
    }

    if (!dataframe || dataframe.columns.length === 0) {
        return (
            <div></div>
        )
    }

    if (dataframe && !user) {
        return (
            <div className="w-full flex justify-center">
                <PermissionBanner/>
            </div>
        )
    }

    const [columnToDrop, setColumnToDrop] = useState("");
    const [applyNormalize, setApplyNormalize] = useState(false);
    const [applyTrim, setApplyTrim] = useState(false);
    const [format, setFormat] = useState("");
    const [replace, setReplace] = useState<any>({ word: "", substitute: ""});

    function handleReplaceChange (event: FormEvent<HTMLInputElement>) {
        setReplace({
            ...replace,
            [event.currentTarget.name]: event.currentTarget.value
        });
    }
 
    async function handleDropColumn (event: FormEvent) {
        event.preventDefault();

        if (columnToDrop.trim().length !== 0) {
            const request = new ServerRequest("post", "/dataframes/alter/drop", { filename, column: columnToDrop });

            const response = await request.handle();

            if (response.getStatus() === 200) {
                setDataframe(response.getData().dataframe);
                return toast.success("Coluna removida");
            } else {
                return toast.error(response.getData().message ?? "Algo deu errado");
            }
        } else {
            return toast.error("Nenhuma coluna selecionada");
        }
    }

    async function handleApplyFilters (event: FormEvent) {
        event.preventDefault();

        if (applyNormalize || applyTrim || format.trim().length !== 0) {
            const filters: string[] = [];

            if (applyNormalize) {
                filters.push("normalize");
            }

            if (applyTrim) {
                filters.push("trim");
            }

            if (format.trim().length !== 0) {
                filters.push(format);
            }

            const request = new ServerRequest("post", "/dataframes/alter/filter", { filename, filters });

            const response = await request.handle();

            if (response.getStatus() === 200) {
                setDataframe(response.getData().dataframe);
                return toast.success("Filtro(s) aplicado(s)");
            } else {
                return toast.error(response.getData().message ?? "Algo deu errado");
            }
        } else {
            return toast.error("Nenhum filtro selecionado");
        }
    }

    async function handleApplyReplace (event: FormEvent) {
        event.preventDefault();

        if (replace.word.trim().length !== 0 ||  replace.substitute.trim().length !== 0) {
            const request = new ServerRequest("post", "/dataframes/alter/replace", { filename, words: [replace.word], substitutes: [replace.substitute] });

            const response = await request.handle();

            setReplace({ word: "", substitute: ""});

            if (response.getStatus() === 200) {
                setDataframe(response.getData().dataframe);
                return toast.success("Palavra(s) substituida(s)");
            } else {
                return toast.error(response.getData().message ?? "Algo deu errado");
            }
        } else {
            return toast.error("Preencha algum dos campos");
        }
    }

    return (
        <div className="w-full">
            <div className="py-2 px-6 w-fit m-4 rounded-md bg-slate-700">
                <h1 className="text-2xl text-white font-bold">Edite o arquivo <span className="text-violet-500 underline">{filename}</span></h1>
            </div>
            <div className="flex w-full justify-evenly gap-5">
                <Card>
                   <div>
                        <h4 className="text-xl font-bold text-violet-500">Remover coluna:</h4>
                        <form className="py-4">
                            <div>
                                <select value={columnToDrop} onChange={(event) => setColumnToDrop(event.target.value)} className="bg-white py-2 px-5 w-full font-bold rounded-sm shadow-md shadow-slate-600">
                                    <option value="">Escolher...</option>
                                    {
                                        dataframe.columns.map((column, index) => {
                                            return (
                                                <option key={index} value={column}>{column}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </form>
                        <p className="text-white font-bold my-4">*Cuidado! Uma vez removida, não é possível restaurar a coluna</p>
                    </div>
                    <div className="flex justify-end mt-4 items-end">
                        <button onClick={handleDropColumn} className="bg-violet-700 px-6 py-2 h-fit rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                            <p className="text-lg text-white font-bold text-center">Remover</p>
                        </button>
                    </div>
                </Card>
                <Card>
                    <div>
                        <h4 className="text-xl font-bold text-violet-500">Aplicar filtro:</h4>
                        <form className="py-4">
                            <div className="mb-4">
                                <div className="flex gap-3">
                                    <input type="checkbox" className="w-5" checked={applyNormalize} onChange={() => setApplyNormalize(!applyNormalize)}/>
                                    <h3 className="text-lg text-white font-bold">Remover acentuação</h3>
                                </div>
                                <div className="flex gap-3">
                                    <input type="checkbox" className="w-5" checked={applyTrim} onChange={() => setApplyTrim(!applyTrim)}/>
                                    <h3 className="text-lg text-white font-bold">Remover espaços adicionais</h3>
                                </div>
                            </div>
                            <hr className="border-2 border-violet-500"/>
                            <div className="mt-4">
                                <div className="flex gap-3">
                                    <input type="radio" className="w-5" name="format" value="upper" onChange={(event) => setFormat(event.target.value)}/>
                                    <h3 className="text-lg text-white font-bold">Tudo maiúsculo</h3>
                                </div>
                                <div className="flex gap-3">
                                    <input type="radio" className="w-5" name="format" value="lower" onChange={(event) => setFormat(event.target.value)}/>
                                    <h3 className="text-lg text-white font-bold">Tudo minúsculo</h3>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleApplyFilters} className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                            <p className="text-lg text-white font-bold text-center">Aplicar</p>
                        </button>
                    </div>
                </Card>
                <Card>
                    <div>
                        <h4 className="text-xl font-bold text-violet-500">Substituir palavra/frase:</h4>
                        <form className="py-4">
                            <div className="my-1">
                                <label className="text-lg font-bold text-violet-500">Palavra</label>
                                <div>
                                    <input type="text" name="word" value={replace.word} onChange={handleReplaceChange} autoComplete="off" className="bg-white py-2 px-4 w-full font-bold rounded-sm shadow-md shadow-slate-600"/>
                                </div>
                            </div>
                            <div className="my-1">
                                <label className="text-lg font-bold text-violet-500">Substituto</label>
                                <div>
                                    <input type="text" name="substitute" value={replace.substitute} onChange={handleReplaceChange} autoComplete="off" className="bg-white py-2 px-4 w-full font-bold rounded-sm shadow-md shadow-slate-600"/>
                                </div>
                            </div>
                        </form>
                        <p className="text-white font-bold my-4">*É possível substituir espaços brancos por palavras, e vice-versa</p>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleApplyReplace} className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                            <p className="text-lg text-white font-bold text-center">Substituir</p>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    )
}