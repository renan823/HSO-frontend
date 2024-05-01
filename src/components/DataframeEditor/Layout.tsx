interface LayoutProps {
    children: React.ReactNode
}

export function Body ({ children }: LayoutProps) {
    return (
        <div className="flex-col w-5/6 h-5/6 m-10">
            {children}
        </div>
    )
}

export function Header ({ children }: LayoutProps) {
    return (
        <div className="flex m-10 h-fit w-full bg-slate-800 rounded-lg p-4 items-center">
            {children}
        </div>
    )
}