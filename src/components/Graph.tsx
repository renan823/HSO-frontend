import { ControlsContainer, FullScreenControl, SigmaContainer, ZoomControl, useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import { SerializedGraph } from "graphology-types";
import { useEffect } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = { height: "90vh", width: "90vw" };

interface GraphProps {
    data: SerializedGraph | undefined
}

export function GraphData ({ data }: GraphProps) {
    const load = useLoadGraph();

    useEffect(() => {
        const graph = new Graph();

        if (data) {
            graph.import(data);
        }

        load(graph);
    }, [load])

    return null;
}

export default function GraphContainer ({ data }: GraphProps) {
    return (
        <SigmaContainer style={sigmaStyle}>
            <GraphData data={data}/>
            <ControlsContainer position={"bottom-right"}>
                <ZoomControl/>
                <FullScreenControl/>
            </ControlsContainer>
        </SigmaContainer>
    )
}