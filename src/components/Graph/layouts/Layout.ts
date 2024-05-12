import Graph from "graphology";

interface Layout {
    handle(graph: Graph): any
}

export default Layout