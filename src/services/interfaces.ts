export interface DataframeInterface {
    columns: string[],
    data: any[][]
}

export interface UserInterface {
    name: string
    email: string,
    id: string,
    token: string,
    role: string
}