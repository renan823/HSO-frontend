import Graph from "graphology";
import Layout from "./Layout";
import random from "graphology-layout/random";

class RandomLayout implements Layout {
    
    handle(graph: Graph): any {
        return random(graph);
    }
}

export default RandomLayout;