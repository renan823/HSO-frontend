"use client";

import { DataframeEditor } from "@/components/DataframeEditor";
import FileSelector from "@/components/FileSelector";
import ServerRequest from "@/services/ServerRequest";
import { DataframeInterface } from "@/services/interfaces";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dataframe () {

    const [selectedFile, setSelectedfile] = useState("")
    const [dataframe, setDataframe] = useState<DataframeInterface>();

    useEffect(() => {
        async function fetch () {
            try {
                let request = new ServerRequest("get", `/dataframes/${selectedFile}`);

                let response = await request.handle();

                setDataframe(response.getData().dataframe);
            } catch (error: any) {
                toast.error("Algo deu errado");
            } 
        }

        if (selectedFile) {
            fetch();
        }
    }, [selectedFile])

    return (
        <DataframeEditor.Layout.Body>
            <DataframeEditor.Layout.Header>
                <FileSelector setSelectedFile={setSelectedfile}/>
            </DataframeEditor.Layout.Header>
            <DataframeEditor.Layout.Header>
                <DataframeEditor.Editor filename={selectedFile} dataframe={dataframe} setDataframe={setDataframe}/>
            </DataframeEditor.Layout.Header>
            <DataframeEditor.View dataframe={dataframe}/>
        </DataframeEditor.Layout.Body>
    )
    
}