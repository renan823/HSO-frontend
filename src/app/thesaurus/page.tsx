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
    const [loading, setLoading] = useState(false);

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
               
                let response = await request.handle();

                setThesaurus(response.getData().thesaurus);
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
                <Loader/>
            </div>
        )
    }

    return (
        <ThesaurusEditor.Layout.Body>
            <ThesaurusEditor.Layout.Header>
                <div>
                    <FileSelector setSelectedFile={setSelectedfile}/>
                    <h2>Cuidado ao preencher seu thesaurus!</h2>
                </div>
            </ThesaurusEditor.Layout.Header>
            <ThesaurusEditor.Layout.Header>
                <ThesaurusEditor.Editor/>
            </ThesaurusEditor.Layout.Header>
            <ThesaurusEditor.View thesaurus={thesaurus}/>
        </ThesaurusEditor.Layout.Body>
    )
}