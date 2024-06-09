import Graph from "graphology";
//import eccentricity from "graphology-metrics/node/eccentricity";

export function density (graph: Graph): number {
    return (2 * graph.edges().length) / (graph.nodes().length * (graph.nodes().length - 1));
}

export function diameter (graph: Graph): number {
    let max = 0;

    return max;
}

export function radius (graph: Graph): number {
    let rad = Infinity;

    

    return rad;
}