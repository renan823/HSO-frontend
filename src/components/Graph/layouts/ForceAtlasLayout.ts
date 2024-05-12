import Graph from "graphology";
import Layout from "./Layout";
import forceAtlas2 from "graphology-layout-forceatlas2";

class ForceAtlasLayout implements Layout {

    handle(graph: Graph): any {
        return forceAtlas2(graph, { iterations: 600, settings: { gravity: 10 }});
    }
}

export default ForceAtlasLayout;