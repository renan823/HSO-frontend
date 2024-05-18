import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import api from "@/services/api";

interface FileSelectorProps {
    setSelectedFile: Dispatch<SetStateAction<string>>
}

export default function FileSelector ({ setSelectedFile }: FileSelectorProps) {
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState<string[]>([]);
    const [file, setFile] = useState<string>();

    function handleSubmit (event: FormEvent) {
        event.preventDefault();

        if (file) {
            setSelectedFile(file);
        } else {
            setSelectedFile("");
            return toast.error("Nenhum arquivo escolhido");
        }
    }

    useEffect(() => {
        async function fetch () {
            try {
                const response = await api.get("/files/all");

                if (response.status === 200) {
                    setFiles(response.data.files);
                } else {
                    toast.error(response.data.message ?? "Algo deu errado");
                }

            } catch (error: any) {
                toast.error("Algo deu errado");
            } finally {
                setLoading(false);
            }
        }

        fetch();
    }, [])

    if (loading) {
        return (
            <Loader/>
        )
    }

    return (
        <div>
            <h2 className="text-2xl m-4 text-violet-700 font-bold">Escolha o arquivo de dados</h2>
            <form onSubmit={handleSubmit} className="flex gap-4 items-center m-4">
                <div>
                    <select onChange={(event) => setFile(event.target.value)} className="bg-white py-2 px-5 w-full font-bold rounded-sm shadow-md shadow-slate-600">
                        <option value="" className="font-bold">Escolher...</option>
                        {
                            files.map((file, index) => {
                                return (
                                    <option className="font-bold" key={index} value={file}>
                                        {file}
                                    </option>
                                )
                            })
                        }   
                    </select>
                </div>
                <div>
                    <button type="submit" className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900 hover:bg-violet-600 hover:shadow-violet-800">
                        <p className="text-lg text-white font-bold text-center">Selecionar</p>
                    </button>
                </div>
            </form>
        </div>
    )
}