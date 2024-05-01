import ServerRequest from "@/services/ServerRequest";
import { DataframeInterface } from "@/services/interfaces";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface EditorProps {
    filename: string
    dataframe: DataframeInterface | undefined,
    setDataframe: Dispatch<SetStateAction<DataframeInterface | undefined>>
}

export default function Editor ({ filename, dataframe, setDataframe }: EditorProps) {
    if (!filename || filename.trim().length === 0) {
        return (
            <div className="flex justify-center w-full">
                <h1 className="text-center text-lg text-white font-bold">Nenhum dataframe foi escolhido</h1>
            </div>
        )
    }

    if (!dataframe || dataframe.columns.length === 0) {
        return (
            <div className="flex justify-center w-full">
                <h1 className="text-center text-lg text-white font-bold">Oops! Este arquivo parece vazio</h1>
            </div>
        )
    }

    const [columnToDrop, setColumnToDrop] = useState("");
    const [applyNormalize, setApplyNormalize] = useState(false);
    const [applyTrim, setApplyTrim] = useState(false);
    const [format, setFormat] = useState("");
    const [replace, setReplace] = useState<any>({ word: "", substitute: ""});

    function handleSelectReplace (event: FormEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget;
        const copy = replace;

        copy[name] = value;

        setReplace(copy);
    }
 
    async function handleDropColumn (event: FormEvent) {
        event.preventDefault();

        if (columnToDrop.trim().length !== 0) {
            let request = new ServerRequest("post", "/dataframes/alter/drop", { filename, column: columnToDrop });

            let response = await request.handle();

            if (response.getStatus() === 200) {
                setDataframe(response.getData().dataframe);
                toast.success("Coluna removida");
            } else {
                toast.error(response.getData().message ?? "Algo deu errado");
            }
        }
    }

    async function handleApplyFilters (event: FormEvent) {
        event.preventDefault();

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

        let request = new ServerRequest("post", "/dataframes/alter/filter", { filename, filters });

        let response = await request.handle();

        if (response.getStatus() === 200) {
            setDataframe(response.getData().dataframe);
            toast.success("Filtro(s) aplicado(s)");
        } else {
            toast.error(response.getData().message ?? "Algo deu errado");
        }
    }

    async function handleApplyReplace (event: FormEvent) {
        event.preventDefault();

        const words = [replace.word];
        const substitutes = [replace.substitute];

        let request = new ServerRequest("post", "/dataframes/alter/replace", { filename, words, substitutes });

        let response = await request.handle();

        if (response.getStatus() === 200) {
            setDataframe(response.getData().dataframe);
            toast.success("Palavra(s) substituida(s)");
        } else {
            toast.error(response.getData().message ?? "Algo deu errado");
        }
    }

    return (
        <div>
            <h1 className="text-2xl text-white font-bold">Edite o arquivo <span className="text-violet-500 underline">{filename}</span></h1>
            <div>
                <form onSubmit={handleDropColumn}>
                    <div>
                        <select value={columnToDrop} onChange={(event) => setColumnToDrop(event.target.value)}>
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
                    <div>
                        <button type="submit">Remover coluna</button>
                    </div>
                </form>
            </div>
            <div>
                <form onSubmit={handleApplyFilters}>
                    <div className="flex gap-3">
                        <input type="checkbox" checked={applyNormalize} onChange={() => setApplyNormalize(!applyNormalize)}/>
                        <h3>Remover acentos</h3>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" checked={applyTrim} onChange={() => setApplyTrim(!applyTrim)}/>
                        <h3>Remover espaços adicionais</h3>
                    </div>
                    <div>
                        <div className="flex gap-3">
                            <input type="radio" name="format" value="upper" onChange={(event) => setFormat(event.target.value)}/>
                            <h3>Tudo maiúsculo</h3>
                        </div>
                        <div className="flex gap-3">
                            <input type="radio" name="format" value="lower" onChange={(event) => setFormat(event.target.value)}/>
                            <h3>Tudo minúsculo</h3>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Aplicar filtros</button>
                    </div>
                </form>
            </div>
            <div>
                <form onSubmit={handleApplyReplace}>
                    <div>
                        <div>
                            <h3>Palavra</h3>
                            <input type="text" name="word" onChange={handleSelectReplace}/>
                        </div>
                        <div>
                            <h3>Substituto</h3>
                            <input type="text" name="substitute" onChange={handleSelectReplace}/>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Substituir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}