import { useLoadGraph, useRegisterEvents, useSetSettings, useSigma } from "@react-sigma/core";
import { useLayoutRandom } from "@react-sigma/layout-random";
import Graph from "graphology";
import { SerializedGraph } from "graphology-types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface GraphDataProps {
    data: SerializedGraph | undefined,
    disableHover: boolean,
    setNode: Dispatch<SetStateAction<string>>
}

export default function GraphData ({ data, disableHover, setNode }: GraphDataProps) {
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();
    const setSettings = useSetSettings();
    const sigma = useSigma();
    const { assign: assignRandom } = useLayoutRandom();

    const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            const graph = new Graph();
            graph.import(data);

            //apply layout here
            assignRandom();

            loadGraph(graph);

            registerEvents({
                enterNode: (event) => setHovered(event.node),
                leaveNode: () => setHovered(null),
                clickNode: (event) => setNode(event.node)
            })
        }
    }, [loadGraph, registerEvents])

    useEffect(() => {
        setSettings({
            nodeReducer: (node, data) => {
                const graph = sigma.getGraph();
                const newData = { ...data, highlighted: data.highlighted || false, color: data.color || "#E2E2E2" };

                if (!disableHover && hovered) {
                    if (node === hovered || graph.neighbors(hovered).includes(node)) {
                        newData.highlighted = true;
                    } else {
                        newData.color = "#E2E2E2";
                        newData.highlighted = false;
                    }
                }
                return newData;
            },
            edgeReducer: (edge, data) => {
                const graph = sigma.getGraph();
                const newData = { ...data, hidden: false };
        
                if (!disableHover&& hovered && !graph.extremities(edge).includes(hovered)) {
                    newData.hidden = true;
                }
                return newData;
            }
        })
    }, [hovered, setSettings, sigma, disableHover])

    return null;
}