"use client";

import FileSelector from "@/components/FileSelector";
import Loader from "@/components/Loader";
import PermissionBanner from "@/components/PermissionBanner";
import { ThesaurusEditor } from "@/components/ThesaurusEditor";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Thesaurus () {
    const { user } = useAuth();

    const [selectedFile, setSelectedfile] = useState("");
    const [thesaurus, setThesaurus] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetch () {
            try {
                const response = await api.get("/thesaurus");

                setThesaurus(response.data.thesaurus);
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
               
                const response = await api.post("/thesaurus/fill", { filename: selectedFile }, { withCredentials: true });

                setThesaurus(response.data.thesaurus);
            } catch (error: any) {
                toast.error("Algo deu errado");
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
            <div className="w-full flex-col justify-center">
                <h2 className="text-white text-2xl font-bold text-center">O thesaurus está sendo carregado com dados</h2>
                <h2 className="text-white text-xl font-bold my-2 text-center">Isso pode demorar um pouquinho...</h2>
                <Loader/>
            </div>
        )
    }

    return (
        <ThesaurusEditor.Layout.Body>
            <ThesaurusEditor.Layout.Header>
                {
                    user?
                        <div className="w-full">
                            <FileSelector setSelectedFile={setSelectedfile}/>
                            <h2 className="text-white text-lg font-bold px-4">Cuidado ao preencher seu thesaurus! Todas as palavras novas serão adicionadas!</h2>
                        </div>
                    :
                        <div className="w-full flex justify-center">
                            <PermissionBanner/>
                        </div>
                }
            </ThesaurusEditor.Layout.Header>
            <ThesaurusEditor.Layout.Header>
                <ThesaurusEditor.Editor setThesaurus={setThesaurus}/>
            </ThesaurusEditor.Layout.Header>
            <ThesaurusEditor.View thesaurus={thesaurus}/>
        </ThesaurusEditor.Layout.Body>
    )
}