import { DataframeInterface } from "@/services/interfaces"

interface ViewProps {
    dataframe: DataframeInterface | undefined,
}

export default function View ({ dataframe }: ViewProps) {

    if (!dataframe || dataframe.columns.length === 0) {
        return (
            <div>
                <h2>Selecione um arquivo</h2>
            </div>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            dataframe.columns.map((column, index) => {
                                return (
                                    <th key={index}>{column}</th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataframe.data.map((items, index) => {
                            return (
                                <tr key={index} className="bg-red-100 p-4 border-2 border-fuchsia-400">
                                    {
                                        items.map((item, index) => {
                                            return (
                                                <td key={index}>{item}</td>
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
    )
}