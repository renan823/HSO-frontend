"use client";

import FileSelector from "@/components/FileSelector";
import { ThesaurusEditor } from "@/components/ThesaurusEditor";
import ServerRequest from "@/services/ServerRequest";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

export default function Thesaurus () {

    const [selectedFile, setSelectedfile] = useState("");
    const [thesaurus, setThesaurus] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function fetch () {
            try {
                let request = new ServerRequest("get", "/thesaurus");

                let response = await request.handle();

                setThesaurus(response.getData().thesaurus);
            } catch (error: any) {
                toast.error("Algo deu errado");
            } 
        }

        fetch();
    }, [])

    useEffect(() => {
        async function fetch () {
            try {
                setLoading(true);

                let request = new ServerRequest("post", "/thesaurus/fill", { filename: selectedFile });
                let start = performance.now();
                let response = await request.handle();
                let end = performance.now()
                setCount(end - start);
                console.log(response.getData());
                setThesaurus(response.getData().data);
            } catch (error: any) {
                toast.error("Algo deu errado");
            } finally {
                setLoading(false)
            }
        }

        if (selectedFile) {
            fetch();
        }
    }, [selectedFile])

    if (loading) {
        return (
            <div>
                <h2>O thesaurus está sendo carregado com dados!</h2>
                <h2>Isso pode demorar um pouquinho...</h2>
                <h2>Contador de tempo {count/1000} segundos</h2>
                <TailSpin/>
            </div>
        )
    }

    return (
        <ThesaurusEditor.Layout.Body>
            <ThesaurusEditor.Layout.Header>
                <FileSelector setSelectedFile={setSelectedfile}/>
                <ThesaurusEditor.Editor/>
            </ThesaurusEditor.Layout.Header>
            <ThesaurusEditor.View thesaurus={thesaurus}/>
            <h2>Contador de tempo {count/1000} segundos</h2>
        </ThesaurusEditor.Layout.Body>
    )
}