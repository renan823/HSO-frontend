import { DataframeInterface } from "@/services/interfaces"

interface ViewProps {
    dataframe: DataframeInterface | undefined,
}

export default function View ({ dataframe }: ViewProps) {

    if (!dataframe || dataframe.columns.length === 0) {
        return (
            <div></div>
        )
    }

    return (
        <div className="mt-10 h-fit w-full bg-slate-800 rounded-lg p-8 items-center">
            <div className="py-2 px-6 w-fit rounded-md bg-slate-700 mb-8">
                <h1 className="text-2xl text-white font-bold">Amostra dos dados</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-violet-800 p-4 rounded-md w-full">
                        <tr>
                            {
                                dataframe.columns.map((column, index) => {
                                    return (
                                        <th className="p-4 text-xl font-bold text-white text-left" key={index}>{column}</th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="w-fit">
                        {
                            dataframe.data.map((items, index) => {
                                return (
                                    <tr key={index} className="border-b-2 border-violet-500 ease-in-out hover:bg-slate-700">
                                        {
                                            items.map((item, index) => {
                                                return (
                                                    <td className="text-left py-3 px-4 font-bold text-slate-400 text-lg" key={index}>{item}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}