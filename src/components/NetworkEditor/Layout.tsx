interface LayoutProps {
    children: React.ReactNode
}

export function Body ({ children }: LayoutProps) {
    return (
        <div className="flex-col my-10 w-5/6 h-full overflow-y-auto">
            {children}
        </div>
    )
}

export function Header ({ children }: LayoutProps) {
    return (
        <div className="flex mb-10 h-fit w-full bg-slate-800 rounded-lg p-4 items-center">
            {children}
        </div>
    )
}