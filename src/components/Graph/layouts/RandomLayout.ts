import Graph from "graphology";
import Layout from "./Layout";
import { random } from "graphology-layout";
import { Attributes } from "graphology-types";

class RandomLayout implements Layout {

    constructor () {};

    execute (graph: Graph, options?: any) {
        return random(graph)
    }

    positions (graph: Graph, options?: any) {
        return this.execute(graph, options);
    }

    assing(graph: Graph): void {
        random.assign(graph);
    }
}

export default RandomLayout;