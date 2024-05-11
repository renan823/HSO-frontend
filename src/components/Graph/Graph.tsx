import { ControlsContainer, FullScreenControl, SearchControl, SigmaContainer, ZoomControl, useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import { SerializedGraph } from "graphology-types";
import { useEffect, useState } from "react";
import "@react-sigma/core/lib/react-sigma.min.css";
import GraphData from "./GraphData";
import { Focus, Maximize, Minimize, ZoomIn, ZoomOut } from "lucide-react";

//import LayoutControl from "./LayoutControl";

interface GraphProps {
    data: SerializedGraph | undefined
}

export default function GraphContainer ({ data }: GraphProps) {

    const [node, setNode] = useState<string>("");

    const sigmaStyle = { height: "70vh", width: "90vw" };

    return (
        <div>
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
                </ControlsContainer>
            </SigmaContainer>
            <div>
                <div>
                   <h1>{node}</h1>
                </div>
            </div>
        </div>
    )
}
