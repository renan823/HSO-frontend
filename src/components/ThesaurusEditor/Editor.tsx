import ServerRequest from "@/services/ServerRequest";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Editor () {

    const [word, setWord] = useState("");
    const [synonym, setSynonym] = useState("");

    async function handleAddSynonym () {
        if (word.trim().length !== 0 && synonym.trim().length !== 0) {
            const request = new ServerRequest("post", "/thesaurus/synonym/add", { word, synonym });

            const response = await request.handle();

            if (response.getStatus() === 200) {
                toast.success(response.getData().message);
            } else {
                toast.error(response.getData().message);
            }
        }
    }

    async function handleRemoveSynonym () {
        if (word.trim().length !== 0 && synonym.trim().length !== 0) {
            const request = new ServerRequest("post", "/thesaurus/synonym/remove", { word, synonym });

            const response = await request.handle();

            if (response.getStatus() === 200) {
                toast.success(response.getData().message);
            } else {
                toast.error(response.getData().message)
            }
        }
    }

    async function handleRemoveWord () {
        if (word.trim().length !== 0) {
            const request = new ServerRequest("post", "/thesaurus/word/remove", { word });

            const response = await request.handle();

            if (response.getStatus() === 200) {
                toast.success(response.getData().message);
            } else {
                toast.error(response.getData().message)
            }
        }
    }

    return (
        <div>
            <div>
                <form className="flex p-2 border-2" onSubmit={(event) => event.preventDefault()}>
                    <div>
                        <label>Palavra</label>
                        <input type="text" onChange={(event) => setWord(event.target.value)}/>
                    </div>
                    <div>
                        <label>Sinônimo</label>
                        <input type="text" onChange={(event) => setSynonym(event.target.value)}/>
                    </div>
                    <div>
                        <button className="flex gap-4" onClick={handleAddSynonym}>
                            <PlusCircle/>
                            <h2>Adicionar sinônimo</h2>
                        </button>
                        <button className="flex gap-4" onClick={handleRemoveSynonym}>
                            <MinusCircle/>
                            <h2>Remover sinônimo</h2>
                        </button>
                        <button className="flex gap-4" onClick={handleRemoveWord}>
                            <MinusCircle/>
                            <h2>Remover palavra (e todas as suas conexões)</h2>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}