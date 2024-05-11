import { X } from "lucide-react"

interface ModalHeaderPorps {
    title: string,
    handleClose: any
}

export function ModalHeader ({ title, handleClose }: ModalHeaderPorps) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-violet-700 text-2xl font-bold">{title}</h1>
            <div className="bg-violet-700 p-1 rounded-lg" onClick={handleClose}>
                <X color="white"/>
            </div>
        </div>
    )
}