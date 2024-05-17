import { useEffect, useState } from "react";
import { WorkerLayoutControl } from "@react-sigma/layout-core";
import { useSigma } from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { useLayoutRandom } from "@react-sigma/layout-random";
import { useLayoutNoverlap, useWorkerLayoutNoverlap } from "@react-sigma/layout-noverlap";
import { useLayoutForce, useWorkerLayoutForce } from "@react-sigma/layout-force";
import { useLayoutForceAtlas2, useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { animateNodes } from "sigma/utils";
import fruchtermanReingold from "@ambalytics/graphology-layout-fruchtermanreingold";
import FruchtermanReingold from "./layouts/FruchtermanReingold";

interface LayoutSelector {
    [key: string]: {
        layout: any,
        worker?: any
    }
}

export default function LayoutControl () {
    const sigma = useSigma();

    const circularLayout = useLayoutCircular();
    const randomLayout = useLayoutRandom();
    const noverlapLayout = useLayoutNoverlap();
    const forceLayout = useLayoutForce({ maxIterations: 100 });
    const forceAtlas2Layout = useLayoutForceAtlas2({ iterations: 100 });

    const [layout, setLayout] = useState<string>("random");

    const layouts: LayoutSelector = {
        "circular": { layout: circularLayout.positions },
        "random": { layout: randomLayout.positions },
        "noverlap": { layout: noverlapLayout.positions, worker: useWorkerLayoutNoverlap },
        "force": { layout: forceLayout.positions, worker: useWorkerLayoutForce },
        "forceatlas2": { layout: forceAtlas2Layout.positions, worker: useWorkerLayoutForceAtlas2 },
    }

    useEffect(() => {
        if (layout) {
            if (layout === "fruchterman") {
                animateNodes(sigma.getGraph(), new FruchtermanReingold().positions(sigma.getGraph()), { duration: 1000 });
            } else {
                sigma.getGraph().forEachNode(node => sigma.getGraph().updateNode(node, (attr) => { return { ...attr, x: attr.x || 0, y: attr.y || 0 } }));
                animateNodes(sigma.getGraph(), layouts[layout].layout(), { duration: 1000 });
            }
        }
    }, [layout, layouts, sigma])

    return (
        <div>
            <div>
                {
                    layouts[layout] && layouts[layout].worker && (
                        <WorkerLayoutControl layout={layouts[layout].worker} settings={{}}/>
                    )
                }
            </div>
            <button onClick={() => setLayout("random")}>random</button>
            <button onClick={() => setLayout("circular")}>circular</button>
            <button onClick={() => setLayout("noverlap")}>noverlap</button>
            <button onClick={() => setLayout("force")}>force</button>
            <button onClick={() => setLayout("forceatlas2")}>forceatlas2</button>
            <button onClick={() => setLayout("fruchterman")}>furchterman</button>
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