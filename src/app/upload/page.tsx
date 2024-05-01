"use client";

import ServerRequest from "@/services/ServerRequest";
import { UploadIcon } from "lucide-react";
import { ChangeEvent, FormEvent, createRef, useState } from "react";
import toast from "react-hot-toast";

export default function Upload () {

    const [file, setFile] = useState<any>();
    const fileRef = createRef<HTMLInputElement>();

    async function handleSubmit (event: FormEvent) {
        event.preventDefault();

        const payload = new FormData();

        payload.set("file", file);

        const request = new ServerRequest("post", "/files/save", payload, { 'Content-Type': 'multipart/form-data' });

        const response = await request.handle();

        if (response.getStatus() === 201) {
            clearField();
            return toast.success("Arquivo adicionado");
        } else {
            return toast.error(response.getData().message ?? "Algo deu errado");
        }
    }

    function handleFileChange (event: ChangeEvent<HTMLInputElement>) {
        const input = event.target;

        if (!input.files || input.files.length === 0) {
            return toast.error("Nenhum arquivo selecionado");
        }

        if (input.files[0].name.split(".").pop() !== "xlsx"){
            return toast.error("Extensão incorreta");
        }

        setFile(input.files[0]);
    }

    function clearField () {
        if (fileRef.current) {
            setFile(null);
            fileRef.current.value = "";
        }
    }

    return (
        <div className="flex w-3/6 m-auto p-6 bg-slate-800 rounded-lg">
            <div>
                <h1 className="text-3xl text-violet-700 font-bold">Faça upload do arquivo</h1>
                <h3 className="text-xl text-white font-bold">Use apenas arquivos .xlsx (Excel/Planilha)</h3>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex">
                            <label htmlFor="dropzone">
                                <div>
                                    <p><span>Clique para escolher</span> ou arraste aqui</p>
                                </div>
                            </label>
                            <input type="file" onChange={handleFileChange} ref={fileRef} name="dropzone" className="hidden"/>
                        </div>
                    </form>
                </div>
            </div>
            <div></div>
        </div>
    )
}