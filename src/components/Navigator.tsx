import Link from "next/link";

interface ItemProps {
    to: string,
    text: string
}


function Item ({ to, text }: ItemProps) {
    return (
        <Link href={to} className="text-lg text-white text-center font-bold">{text}</Link>
    )
}

export default function Navigator () {
    return (
        <div className="flex w-full p-4 bg-slate-800 gap-10 items-center">
            <div className="flex w-3/5">
                <h2 className="text-2xl text-white text-center font-bold">Hierarquia Social dos Objetos</h2>
            </div>
            <div className="flex justify-around w-2/5">
                <Item to="/" text="Home"/>
                <Item to="/upload" text="Arquivos"/>
                <Item to="/dataframe" text="Dados"/>
                <Item to="/thesaurus" text="Thesaurus"/>
                <Item to="/network" text="Redes"/>
            </div>
        </div>
    )
}