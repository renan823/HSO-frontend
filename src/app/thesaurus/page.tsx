"use client";

import FileSelector from "@/components/FileSelector";
import Loader from "@/components/Loader";
import { ThesaurusEditor } from "@/components/ThesaurusEditor";
import ServerRequest from "@/services/ServerRequest";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Thesaurus () {

    const [selectedFile, setSelectedfile] = useState("");
    const [thesaurus, setThesaurus] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetch () {
            try {
                const request = new ServerRequest("get", "/thesaurus");

                const response = await request.handle();

                setThesaurus(response.getData().thesaurus);
            } catch (error: any) {
                return toast.error("Algo deu errado");
            } 
        }

        fetch();
    }, [])

    useEffect(() => {
        async function fetch () {
            try {
                setLoading(true);

                const request = new ServerRequest("post", "/thesaurus/fill", { filename: selectedFile });
               
                const response = await request.handle();

                setThesaurus(response.getData().thesaurus);
            } catch (error: any) {
                return toast.error("Algo deu errado");
            } finally {
                setLoading(false)
            }
        }

        if (selectedFile && selectedFile.trim().length !== 0) {
            fetch();
            setSelectedfile("");
        }
    }, [selectedFile])

    if (loading) {
        return (
            <div>
                <h2>O thesaurus está sendo carregado com dados</h2>
                <h2>Isso pode demorar um pouquinho...</h2>
                <Loader/>
            </div>
        )
    }

    return (
        <ThesaurusEditor.Layout.Body>
            <ThesaurusEditor.Layout.Header>
                <div className="w-full">
                    <FileSelector setSelectedFile={setSelectedfile}/>
                    <h2 className="text-white text-lg font-bold px-4">Cuidado ao preencher seu thesaurus! Todas as palavras novas serão adicionadas!</h2>
                </div>
            </ThesaurusEditor.Layout.Header>
            <ThesaurusEditor.Layout.Header>
                <ThesaurusEditor.Editor/>
            </ThesaurusEditor.Layout.Header>
            <ThesaurusEditor.View thesaurus={thesaurus}/>
        </ThesaurusEditor.Layout.Body>
    )
}