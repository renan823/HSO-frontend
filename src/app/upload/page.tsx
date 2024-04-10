"use client";

import ServerRequest from "@/services/ServerRequest";
import { ChangeEvent, FormEvent, createRef, useState } from "react";
import toast from "react-hot-toast";

export default function Upload () {

    const [file, setFile] = useState<any>();
    const fileRef = createRef<HTMLInputElement>();

    async function handleSubmit (event: FormEvent) {
        event.preventDefault();

        let payload = new FormData();

        payload.set("file", file);

        let request = new ServerRequest("post", "/files/save", payload, { 'Content-Type': 'multipart/form-data' });

        let response = await request.handle();

        if (response.getStatus() === 201) {
            clearField();
            return toast.success("Arquivo adicionado");
        } else {
            return toast.error(response.getData().message ?? "Algo deu errado");
        }
    }

    function handleFileChange (event: ChangeEvent<HTMLInputElement>) {
        let input = event.target;

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
        <div>
            <h1>Faça upload do arquivo</h1>
            <h3>Use apenas arquivos .xlsx (Excel/Planilha)</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Escolha seu arquivo</label>
                        <div>
                            <div>
                                <input type="file" onChange={handleFileChange} ref={fileRef}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}