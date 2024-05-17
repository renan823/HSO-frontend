import { LayoutMapping } from "@/services/interfaces";
import Graph from "graphology";
import Layout from "./Layout";
import RandomLayout from "./RandomLayout";
import noverlap from "graphology-layout-noverlap";

class NoverlapLayout implements Layout {

    constructor () {}
    
    execute (graph: Graph, options?: any): LayoutMapping {
        new RandomLayout().assing(graph);
        return noverlap(graph, options);
    }

    positions (graph: Graph, options?: any): LayoutMapping {
        return this.execute(graph, options);
    }

    assing (graph: Graph, options?: any): void {
        noverlap.assign(graph, options);
    }
}

export default NoverlapLayout;