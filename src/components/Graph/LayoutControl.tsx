import { useEffect, useState } from "react";
import { useSigma } from "@react-sigma/core";
import { animateNodes } from "sigma/utils";
import FruchtermanReingold from "./layouts/FruchtermanReingold";
import CircularLayout from "./layouts/CircularLayout";
import RandomLayout from "./layouts/RandomLayout";
import { Waypoints } from "lucide-react";
import Graph from "graphology";
import NoverlapLayout from "./layouts/NoverlapLayout";
import ForceAtlas2Layout from "./layouts/ForceAtlas2Layout";

interface LayoutSelector {
    [key: string]: {
        layout: any,
    }
}

export default function LayoutControl () {
    const sigma = useSigma();

    const [layout, setLayout] = useState<string>("random");
    const [opened, setOpened] = useState<boolean>(false);

    const layouts: LayoutSelector = {
        "random": { layout: (graph: Graph) => new RandomLayout().positions(graph) },
        "circular": { layout: (graph: Graph) => new CircularLayout().positions(graph) },
        "noverlap": { layout: (graph: Graph) => new NoverlapLayout().positions(graph, { maxIterations: 1000 }) },
        "forceatlas2": { layout: (graph: Graph) => new ForceAtlas2Layout().positions(graph, { iterations: 50 })},
        "fruchterman": { layout: (graph: Graph) => new FruchtermanReingold().positions(graph, {}) }
    }

    useEffect(() => {
        if (layout) {
            sigma.getGraph().forEachNode(node => sigma.getGraph().updateNode(node, (attr) => { return { ...attr, x: attr.x || 0, y: attr.y || 0 } }));
            animateNodes(sigma.getGraph(), layouts[layout].layout(sigma.getGraph()), { duration: 1000 });
        }
    }, [layout, sigma])

    useEffect(() => {
        const close = () => {
            setOpened(false);
        };
        if (opened === true) {
            setTimeout(() => document.addEventListener("click", close), 0);
        }
        return () => document.removeEventListener("click", close);
    }, [opened]);

    return (
        <div>
            <div>
                <button onClick={() => setOpened((e: boolean) => !e)}>
                    <Waypoints size={30} color="#6d28d9"/>
                </button>
                    {
                        opened === true && (
                            <ul className="absolute bottom-0 right-9  m-0 p-0">
                                {Object.keys(layouts).map((name) => {
                                    return (
                                        <li key={name} className="m-2 bg-slate-300 flex justify-center px-1">
                                            <button className="text-center text-violet-700 font-bold" onClick={() => setLayout(name)}>{name}</button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )
                    }
            </div>
        </div>
    )
}

/*
import React, { useEffect, useMemo, useState } from "react";

import { animateNodes } from "sigma/utils";

import { useSigma } from "@react-sigma/core";
import { LayoutHook, LayoutWorkerHook, WorkerLayoutControl } from "@react-sigma/layout-core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { useLayoutCirclepack } from "@react-sigma/layout-circlepack";
import { useLayoutRandom } from "@react-sigma/layout-random";
import { useLayoutNoverlap, useWorkerLayoutNoverlap } from "@react-sigma/layout-noverlap";
import { useLayoutForce, useWorkerLayoutForce } from "@react-sigma/layout-force";
import { useLayoutForceAtlas2, useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { Network } from "lucide-react";


export default function LayoutControl () {
    const sigma = useSigma();
    const [layout, setLayout] = useState<string>("circular");
    const [opened, setOpened] = useState<boolean>(false);
    const layoutCircular = useLayoutCircular();
    const layoutCirclepack = useLayoutCirclepack();
    const layoutRandom = useLayoutRandom();
    const layoutNoverlap = useLayoutNoverlap();
    const layoutForce = useLayoutForce({ maxIterations: 100 });
    const layoutForceAtlas2 = useLayoutForceAtlas2({ iterations: 100 });

    const layouts: { [key: string]: { layout: any; worker?: any } } = useMemo(() => {
        return {
            circular: {
                layout: layoutCircular,
            },
            circlepack: {
                layout: layoutCirclepack,
            },
            random: {
                layout: layoutRandom,
            },
            noverlaps: {
                layout: layoutNoverlap,
                worker: useWorkerLayoutNoverlap,
            },
            forceDirected: {
                layout: layoutForce,
                worker: useWorkerLayoutForce,
            },
            forceAtlas: {
                layout: layoutForceAtlas2,
                worker: useWorkerLayoutForceAtlas2,
            },
        };
    }, []);

    useEffect(() => {
        const { positions } = layouts[layout].layout;
        console.log(positions)
        
        if (positions) {
            animateNodes(sigma.getGraph(), positions(), { duration: 1000 });
        }
    }, [layout, layouts, sigma]);

    useEffect(() => {
        const close = () => {
            setOpened(false);
        };
        if (opened === true) {
            setTimeout(() => document.addEventListener("click", close), 0);
        }
        return () => document.removeEventListener("click", close);
    }, [opened]);

    return (
        <>
            <div>
                {layouts[layout] && layouts[layout].worker && (
                    <WorkerLayoutControl layout={layouts[layout].worker} settings={{}}/>
                )}
            </div>
            <div>
                <div >
                    <button onClick={() => setOpened((e: boolean) => !e)}>
                        <Network/>
                    </button>
                    {opened === true && (
                        <ul className="absolute bottom-0 right-9 bg-slate-400 m-0 p-0">
                            {Object.keys(layouts).map((name) => {
                                return (
                                <li key={name}>
                                    <button className="btn btn-link" onClick={() => setLayout(name)}>{name}</button>
                                </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};
 */