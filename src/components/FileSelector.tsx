import ServerRequest from "@/services/ServerRequest";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import Loader from "./Loader";

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
            return toast.error("Nenhum arquivo escolhido");
        }
    }

    useEffect(() => {
        async function fetch () {
            try {
                let request = new ServerRequest("get", "/files/all");

                let response = await request.handle();

                if (response.getStatus() === 200) {
                    setFiles(response.getData().files);
                } else {
                    toast.error(response.getData().message ?? "Algo deu errado");
                }

            } catch (error: any) {
                toast.error("Algo deu errado");
            } finally {
                setLoading(false);
            }
        }

        fetch();
    })

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
                    <button type="submit" className="bg-violet-700 px-6 py-2 rounded-md shadow-md shadow-violet-900">
                        <p className="text-lg text-white font-bold text-center">Selecionar</p>
                    </button>
                </div>
            </form>
        </div>
    )
}