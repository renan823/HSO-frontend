import Graph from "../Graph";

export default function View ({ thesaurus }: any) {

    if (!thesaurus) {
        return (
            <div>
                <h2>Nada aqui!</h2>
            </div>
        )
    }

    console.log(typeof thesaurus);
    console.log(thesaurus);

    return (
        <div>
            <h2>Thesaurus!</h2>
            <Graph data={thesaurus}/>
        </div>
    )
}