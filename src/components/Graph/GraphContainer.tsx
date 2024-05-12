import { ControlsContainer, FullScreenControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import Graph from "graphology";
import { SerializedGraph } from "graphology-types";
import * as GraphMetrics from "graphology-metrics/graph";
import { useEffect, useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import GraphData from "./GraphData";
import { Focus, Maximize, Minimize, ZoomIn, ZoomOut } from "lucide-react";
import LayoutControl from "./LayoutControl";

interface GraphProps {
    data: SerializedGraph | undefined
}

interface NodeData {
    degree: number,
    neighbors: string[],
}

interface NetworkData {
    density: number,
    diameter: number
}

export default function GraphContainer ({ data }: GraphProps) {
    const [node, setNode] = useState<string>("");
    const [nodeData, setNodeData] = useState<NodeData | undefined>();
    const [graph, setGraph] = useState<Graph>(new Graph({ allowSelfLoops: false }));
    const [networkData, setNetworkData] = useState<NetworkData | undefined>()

    const sigmaStyle = { height: "70vh", width: "90vw" };

    useEffect(() => {
        if (data) {
            setGraph(new Graph({ allowSelfLoops: false }).import(data));
            setNetworkData({
                density: GraphMetrics.density(graph.nodes.length, graph.edges.length),
                diameter: GraphMetrics.diameter(graph)
            })
        }
    }, [])

    useEffect(() => {
        if (node) {
            setNodeData({
                neighbors: graph.neighbors(node),
                degree: graph.degree(node)
            })
        }
    }, [node])

    useEffect(() => {
        if (data) {
            setGraph(new Graph({ allowSelfLoops: false }).import(data));
            setNetworkData({
                density: GraphMetrics.density(graph.nodes.length, graph.edges.length),
                diameter: GraphMetrics.diameter(graph)
            })
        }
    }, [data])

    return (
        <div className="overflow-y-auto">
            <SigmaContainer style={sigmaStyle}>
                <GraphData data={data} disableHover={false} setNode={setNode}/>
                <ControlsContainer position={"bottom-right"}>
                    <ZoomControl labels={{ zoomIn: "PLUS", zoomOut: "MINUS", reset: "RESET" }}>
                        <ZoomIn size={30}/>
                        <ZoomOut size={30}/>
                        <Focus size={30}/>
                    </ZoomControl>
                    <FullScreenControl>
                        <Maximize size={30}/>
                        <Minimize size={30}/>
                    </FullScreenControl>
                    <LayoutControl/>
                </ControlsContainer>
            </SigmaContainer>
            <div>
                <div>
                    <h1>Densidade: {networkData?.density} Diametro: {networkData?.diameter}</h1>
                   <h1>{node}</h1>
                   <h2>grau: {nodeData?.degree}</h2>
                   <h2>lista de vizinhos: {nodeData?.neighbors.join("; ")}</h2>
                </div>
            </div>
        </div>
    )
}
