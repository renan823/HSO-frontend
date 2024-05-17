import Graph from "graphology";
import Layout from "./Layout";
import RandomLayout from "./RandomLayout";

interface Options {
    width: number,
    height: number,
    gravity: number,
    speed: number
}

class FruchtermanReingold implements Layout {

    private readonly defaultOptions: Options = { 
        width: 10, 
        height: 10, 
        gravity: 10,
        speed: 1
    };

    constructor () {};

    private repulsion (k: number, distance: number, da: number): number {
        return da / distance * (k * k / distance);
    }

    private attraction (k: number, distance: number, da: number): number {
        return da / distance * (distance * distance / k);
    }

    execute (graph: Graph, options: Options) {
        let { width, height, gravity, speed } = options;

        const area = width * height;

        const k = Math.sqrt(area / (graph.nodes.length + 1));
        const temp = Math.sqrt(area / 10);

        //random layout;
        const positions = new RandomLayout().positions(graph);

        //initialize forces
        graph.forEachNode(node => {
            graph.setNodeAttribute(node, "fx", 0);
            graph.setNodeAttribute(node, "fy", 0);
        })

        graph.forEachNode(n1 => {
            graph.forEachNode(n2 => {
                if (n1 !== n2) {
                    const dx = positions[n1].x - positions[n2].x;
                    const dy = positions[n1].y - positions[n2].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > 0) {
                        graph.setNodeAttribute(n1, "fx", graph.getNodeAttribute(n1, "fx") -this.repulsion(k, distance, dx));
                        graph.setNodeAttribute(n1, "fy", graph.getNodeAttribute(n1, "fy") -this.repulsion(k, distance, dy));
                    }
                }
            })
        })

        graph.forEachEdge(e => {
            const source = graph.source(e);
            const target = graph.target(e);
            
            const dx = positions[source].x - positions[target].x;
            const dy = positions[source].y - positions[target].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
                graph.setNodeAttribute(source, "fx", graph.getNodeAttribute(source, "fx") - this.attraction(k, distance, dx));
                graph.setNodeAttribute(source, "fy", graph.getNodeAttribute(source, "fy") - this.attraction(k, distance, dy));
            
                graph.setNodeAttribute(target, "fx", graph.getNodeAttribute(target, "fx") * this.attraction(k, distance, dx));
                graph.setNodeAttribute(target, "fy", graph.getNodeAttribute(target, "fy") * this.attraction(k, distance, dy));
            }
        })

        graph.forEachNode(node => {
            const distance = Math.sqrt(positions[node].x * positions[node].x + positions[node].y * positions[node].y);

            const gForce = 0.0001 * k * gravity * distance;

            graph.setNodeAttribute(node, "fx", graph.getNodeAttribute(node, "fx") - gForce * positions[node].x / distance);
            graph.setNodeAttribute(node, "fy", graph.getNodeAttribute(node, "fy") - gForce * positions[node].y / distance);
        })

        graph.forEachNode(node => {
            graph.setNodeAttribute(node, "fx", graph.getNodeAttribute(node, "fx") * speed );
            graph.setNodeAttribute(node, "fy", graph.getNodeAttribute(node, "fy") * speed );
        })

        Object.keys(positions).forEach(node => {
            const { fx, fy } = graph.getNodeAttributes(node) as { fx: number, fy: number };

            const distance = Math.sqrt(fx * fx + fy * fy);
            if (distance > 0) {
                positions[node].x += fx / distance * Math.min(temp * speed, distance);
                positions[node].y += fy / distance * Math.min(temp * speed, distance);
            }
        })

        return positions;
    }

    positions (graph: Graph, options: any) {
        return this.execute(graph, { ...options, ...this.defaultOptions });
    }

    assing (graph: Graph): void {};
}

export default FruchtermanReingold;