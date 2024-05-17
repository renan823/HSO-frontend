import { LayoutMapping } from "@/services/interfaces";
import Graph from "graphology";

interface Layout {
    execute (graph: Graph, options?: any): LayoutMapping;
    positions (graph: Graph, options?: any): LayoutMapping;
    assing (graph: Graph, options?: any): void;
}

export default Layout;

