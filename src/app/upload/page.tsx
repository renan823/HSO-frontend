"use client";

import ServerRequest from "@/services/ServerRequest";
import { UploadIcon } from "lucide-react";
import { FormEvent, createRef, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export default function Upload () {

    const [file, setFile] = useState<File | any>(null);
    const fileRef = createRef<HTMLInputElement>();

    const onDrop = useCallback((files: File[]) => {
        if (!files || files.length === 0) {
            return toast.error("Nenhum arquivo selecionado");
        }

        if (files[0].name.split(".").pop() !== "xlsx"){
            return toast.error("Extensão incorreta");
        }

        console.log("oi");

        setFile(files[0]);
    }, [])

    const dropzone = useDropzone({
        onDrop
    })

    async function handleSubmit (event: FormEvent) {
        event.preventDefault();

        if (file) {
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
        } else {
            return toast.error("Nenhum arquivo selecionado");
        }
    }

    function clearField () {
        if (fileRef.current) {
            setFile(null);
            fileRef.current.value = "";
        }
    }

    return (
        <div className="flex-col w-3/6 p-6 bg-slate-800 rounded-lg">
            <div>
                <h1 className="text-3xl text-violet-700 font-bold">Faça upload do arquivo</h1>
                    <h3 className="text-xl text-white font-bold">Use apenas arquivos .xlsx (Excel/Planilha)</h3>
            </div>
            <div {...dropzone.getRootProps()} className="flex p-10 m-5 cursor-pointer border-slate-500 border-4 border-dashed bg-gray-700 justify-center hover:border-gray-500 rounded-lg">
                <label htmlFor="dropzone">
                    {
                        file ? 
                            <div>
                                <div className="bg-white rounded-md p-3">
                                    <p className="text-violet-700 text-lg text-center font-bold">Arquivo: {file.name}</p>
                                </div>
                            </div>
                        :
                            <div>
                                <div className="p-3 flex justify-center">
                                    <UploadIcon color="white" size={50}/>
                                </div>
                                <p className="text-xl text-white font-bold text-center"><span className="text-violet-600">Clique para escolher</span> ou arraste aqui</p>
                            </div>
                    }
                </label>
                <input {...dropzone.getInputProps()} type="file" name="dropzone" className="hidden" ref={fileRef}/>
            </div>
            <div className="flex justify-end px-5">
                <button onClick={handleSubmit} className="bg-violet-700 px-10 py-2 rounded-md shadow-md shadow-violet-900">
                    <p className="text-lg text-white font-bold text-center">Enviar</p>
                </button>
            </div>
        </div>
    )
}