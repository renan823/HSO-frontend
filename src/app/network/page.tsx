"use client"

import FileSelector from "@/components/FileSelector";
import GraphContainer from "@/components/Graph";
import Loader from "@/components/Loader";
import { NetworkEditor } from "@/components/NetworkEditor";
import ServerRequest from "@/services/ServerRequest";
import { SerializedGraph } from "graphology-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Network () {

    const [selectedFile, setSelectedfile] = useState("");
    const [network, setNetwork] = useState<SerializedGraph>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetch () {
            try {
                setLoading(true);

                const request = new ServerRequest("post", "/network/new");
               
                const response = await request.handle();

                setNetwork(response.getData().network);
            } catch (error: any) {
                return toast.error("Algo deu errado");
            } finally {
                setLoading(false)
            }
        }

        fetch();
    }, [])

    if (loading) {
        return (
            <div>
                <h2>A rede está sendo gerada</h2>
                <h2>Isso pode demorar um pouquinho...</h2>
                <Loader/>
            </div>
        )
    }

    return (
        <NetworkEditor.Layout.Body>
            <NetworkEditor.Layout.Header>
                <div className="w-full">
                    <FileSelector setSelectedFile={setSelectedfile}/>
                    <h2>Escolha um arquivo para gerar a rede</h2>
                </div>
            </NetworkEditor.Layout.Header>
            <GraphContainer data={network}/>
        </NetworkEditor.Layout.Body>
    )
}