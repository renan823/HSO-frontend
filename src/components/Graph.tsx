import ServerRequest from "@/services/ServerRequest";
import { useEffect, useState } from "react";
import CytoscapeElement from "react-cytoscapejs";
import toast from "react-hot-toast";
import cytoscape from "cytoscape";

//layouts
import fcose from "cytoscape-fcose";
import cola from "cytoscape-cola";

interface GraphProps {
    data: {
        [Key: string]: string[]
    }
}

//layout não tá funcionando!!!!!!!!

export default function Graph ({ data }: GraphProps) {
    const [elements, setElements] = useState([]);

    cytoscape.use(fcose);
    cytoscape.use(cola);

    useEffect(() => {
        async function fetch() {
            try {
                let request = new ServerRequest("post", "/network/new", { data });

                let response = await request.handle();

                if (response.getStatus() === 201) {
                    setElements(response.getData().network);
                }
            } catch (error: any) {
                toast.error("Algo deu errado");
            }
        }

        if (data) {
            fetch();
        }
    }, [data])

    return (
        <div className="w-full h-full flex">
            <CytoscapeElement 
                elements={elements} 
                style={{ width: 500, height: 500 }}  
                className="border-2 border-black" 
                layout={
                    { 
                        name: "cose",
                        animate: true,
                        fit: true
                    }
                }
                stylesheet={[
                    {
                        selector: "node",
                        style: {
                            "background-color": (e: cytoscape.NodeSingular) => e.data("color"),
                            "width": (e: cytoscape.NodeSingular) => e.data("weight"),
                            "height": (e: cytoscape.NodeSingular) => e.data("weight"),
                        }
                    },
                    {
                        selector: "edge",
                        style: {
                            "width": (e: cytoscape.EdgeSingular) => e.data("weight"),
                        }
                    },
                ]}
                cy={() => cytoscape}
            />
        </div>
    )
}