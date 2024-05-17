import Graph from "graphology";
import { random } from "graphology-layout";

interface Options {
    width?: number,
    height?: number
    iterations?: number,
    speed?: number,
    gravity?: number,
    theta?: number;
}

class FruchtermanReingold {
    positions (graph: Graph, options: Options = {}) {
        const {
            width = 800,
            height = 600,
            iterations = 1000,
            speed = 1,
            gravity = 10,
            theta = 0.8
        } = options;
        
        const k = Math.sqrt((width * height) / graph.order);
        
        let positions = random(graph);
       
        
        for (let i = 0; i < iterations; i++) {
            graph.forEachNode(node => {
                let displacement = { x: 0, y: 0 };
        
                graph.forEachNode(otherNode => {
                    if (node === otherNode) return;
        
                    const delta = {
                        x: positions[node].x - positions[otherNode].x,
                        y: positions[node].y - positions[otherNode].y
                    };
        
                    const distance = Math.max(Math.sqrt(delta.x ** 2 + delta.y ** 2), 0.01);
        
                    const repulsionForce = k ** 2 / distance;
                    displacement.x += (delta.x / distance) * repulsionForce;
                    displacement.y += (delta.y / distance) * repulsionForce;
                });
        
                graph.forEachNeighbor(node, neighbor => {
                    const delta = {
                        x: positions[node].x - positions[neighbor].x,
                        y: positions[node].y - positions[neighbor].y
                    };
            
                    const distance = Math.max(Math.sqrt(delta.x ** 2 + delta.y ** 2), 0.01);
            
                    const attractionForce = distance ** 2 / k;
                    displacement.x -= (delta.x / distance) * attractionForce;
                    displacement.y -= (delta.y / distance) * attractionForce;
                });
        
                const distance = Math.sqrt(displacement.x ** 2 + displacement.y ** 2);
                displacement.x /= distance || 1;
                displacement.y /= distance || 1;
            
                const temperature = (Math.sqrt(width * height) / 10) * (1 - (i + 1) / iterations);
                positions[node].x += displacement.x * Math.min(distance, temperature * speed);
                positions[node].y += displacement.y * Math.min(distance, temperature * speed);
            
                // Aplicando a força gravitacional
                positions[node].x += (Math.random() - 0.5) * gravity;
                positions[node].y += (Math.random() - 0.5) * gravity;
            });
        }
        
        return positions;
    }
}

export default FruchtermanReingold;