import { TailSpin } from "react-loader-spinner";

export default function Loader () {
    return (
        <div className="flex w-full justify-center items-center">
            <TailSpin color="#5b21b6" width={100} height={100} strokeWidth={3}/>
        </div>
    )
}