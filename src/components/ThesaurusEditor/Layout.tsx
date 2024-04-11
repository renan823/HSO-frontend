interface LayoutProps {
    children: React.ReactNode
}


export function Body ({ children }: LayoutProps) {
    return (
        <div>
            {children}
        </div>
    )
}

export function Header ({ children }: LayoutProps) {
    return (
        <div>
            {children}
        </div>
    )
}