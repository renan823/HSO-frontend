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
            <h2>Selecione o arquivo</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <select onChange={(event) => setFile(event.target.value)}>
                            <option value="">Escolher...</option>
                            {
                                files.map((file, index) => {
                                    return (
                                        <option key={index} value={file}>
                                            {file}
                                        </option>
                                    )
                                })
                            }   
                        </select>
                    </div>
                    <div>
                        <button type="submit">Selecionar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}