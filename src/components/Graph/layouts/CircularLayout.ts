import { LayoutMapping } from "@/services/interfaces";
import Graph from "graphology";
import Layout from "./Layout";
import { circular } from "graphology-layout";

class CircularLayout implements Layout {

    constructor () {}

    execute (graph: Graph, options?: any): LayoutMapping {
        return circular(graph);
    }

    positions (graph: Graph, options?: any): LayoutMapping {
        return this.execute(graph, options);
    }
   
    assing(graph: Graph): void {
        circular.assign(graph);
    }
}

export default CircularLayout;
