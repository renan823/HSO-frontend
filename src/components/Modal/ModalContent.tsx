import { ReactNode } from "react";

interface ModalContentProps {
    children: ReactNode,
}

export function ModalContent ({ children }: ModalContentProps) {
    return (
        <div className="h-full overflow-y-auto px-2 py-4 flex justify-center">
            {children}
        </div>
    )
}