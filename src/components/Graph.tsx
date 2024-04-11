import { useEffect, useState } from "react";
import CytoscapeElement from "react-cytoscapejs";

export default function Graph ({ data }: any) {

    useEffect(() => {
        console.log(data)
    }, [data])

    const [elements, setElements] = useState([
        { data: { id: '1', label: 'Node 1' }},
        { data: { id: '2', label: 'Node 2' }},
        { data: { source: '1', target: '2', label: 'Edge from Node1 to Node2' }} 
    ])

    return (
        <div>
            <CytoscapeElement elements={elements} className="border-2 border-black w-full h-96"/>
        </div>
    )
}