import Link from "next/link";

export default function Navigator () {
    return (
        <div className="flex p-2 m-4 justify-evenly">
            <Link href="/">Home</Link>
            <Link href="/upload">Uploads</Link>
            <Link href="/dataframe">Dados</Link>
            <Link href="/thesaurus">Thesaurus</Link>
            <Link href="/network">Redes</Link>
        </div>
    )
}