interface CardProps {
    children: React.ReactNode
}

export default function Card ({ children }: CardProps) {
    return (
        <div className="flex flex-col justify-between w-5/6 p-6 m-4 rounded-md bg-slate-700">
            { children }
        </div>
    )
}