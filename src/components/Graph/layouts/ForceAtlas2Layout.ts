import { LayoutMapping } from "@/services/interfaces";
import Graph from "graphology";
import Layout from "./Layout";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import RandomLayout from "./RandomLayout";

class ForceAtlas2Layout implements Layout {

    constructor () {};

    execute (graph: Graph, options?: any): LayoutMapping {
        new RandomLayout().assing(graph);
        return forceAtlas2(graph, {...options});
    }

    positions (graph: Graph, options?: any): LayoutMapping {
        return this.execute(graph, options);
    }

    assing (graph: Graph, options: any): void {
        forceAtlas2.assign(graph, options);
    }
}

export default ForceAtlas2Layout;