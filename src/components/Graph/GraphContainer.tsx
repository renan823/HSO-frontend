import { ControlsContainer, FullScreenControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import Graph from "graphology";
import { SerializedGraph } from "graphology-types";
import * as GraphMetrics from "graphology-metrics/graph";
import { useEffect, useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import GraphData from "./GraphData";
import { Focus, Maximize, Minimize, ZoomIn, ZoomOut } from "lucide-react";
import LayoutControl from "./LayoutControl";
import { weightedDegree } from "graphology-metrics/node";

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
        <div className="overflow-y-auto flex gap-10 p-2">
            <SigmaContainer style={sigmaStyle}>
                <GraphData data={data} disableHover={false} setNode={setNode}/>
                <ControlsContainer position={"bottom-right"}>
                    <ZoomControl labels={{ zoomIn: "PLUS", zoomOut: "MINUS", reset: "RESET" }}>
                        <ZoomIn size={30} color="#6d28d9"/>
                        <ZoomOut size={30} color="#6d28d9"/>
                        <Focus size={30} color="#6d28d9"/>
                    </ZoomControl>
                    <FullScreenControl>
                        <Maximize size={30} color="#6d28d9"/>
                        <Minimize size={30} color="#6d28d9"/>
                    </FullScreenControl>
                    <LayoutControl/>
                </ControlsContainer>
            </SigmaContainer>
            <div className="w-2/6">
                <div className="w-full h-4/5 p-2">
                    <h2 className="text-violet-700 font-bold">N° de nós: {graph.nodes().length}</h2>
                    <h2 className="text-violet-700 font-bold">N° de arestas: {graph.edges().length}</h2>
                    <h2 className="text-slate-800 font-bold">Densidade: {networkData?.density}</h2>
                    <h2 className="text-slate-800 font-bold">Diametro: {networkData?.diameter}</h2>
                    <hr className="my-2 border-violet-700"/>
                    <h2 className="text-slate-800 font-bold">Nó selecionado: {node}</h2>
                    <h2 className="text-slate-800 font-bold">Grau do nó: {nodeData?.degree}</h2>
                    <h2 className="text-slate-800 font-bold">Grau ponderado do nó: { node ? weightedDegree(graph, node): "" }</h2>
                    <h2 className="text-slate-800 font-bold">Lista de vizinhos: </h2>
                    {
                        nodeData ?
                            <div className="h-2/5 flex-col">
                                <div className="overflow-y-auto p-2 h-full">
                                    <ul className="list-disc list-inside text-slate-800 font-bold">
                                        {
                                            nodeData.neighbors.sort().map(neighbor => {
                                                return (
                                                    <li key={neighbor}>{neighbor}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        :
                            <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
