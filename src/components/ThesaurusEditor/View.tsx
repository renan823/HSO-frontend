"use client"

import { useState } from "react";

interface ViewProps {
    thesaurus: {
        [Key: string]: string[]
    }
}


export default function View ({ thesaurus }: ViewProps) {

    if (!thesaurus) {
        return (
            <div>
                <h2>Nada aqui!</h2>
            </div>
        )
    }

    const [search, setSearch] = useState("");

    return (
        <div>
            <h2>Thesaurus!</h2>
            <div>
                <h2>Busca de palavras:</h2>
                <input type="text" onChange={(event) => setSearch(event.target.value)}/>
            </div>
            <div className="flex flex-row">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Palavra</th>
                                <th>Sinônimos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.entries(thesaurus).map(([word, synonyms], index) => {
                                    if (word.includes(search) || synonyms.join("; ").includes(search)) {
                                        return (
                                            <tr key={index}>
                                                <td>{word}</td>
                                                <td>{synonyms.join("; ")}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}