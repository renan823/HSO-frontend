import Link from "next/link";

export default function Home () {
	return (
		<div>
			<div>
				<Link href="/login" className="text-white text-xl font-bold">Faça login para mais privilégios!</Link>
			</div>
		</div>
	)
}