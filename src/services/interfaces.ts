export interface DataframeInterface {
    columns: string[],
    data: any[][]
}

export interface SignupUserInterface {
    name: string,
    email: string,
    role: string,
    password: string
}

export interface UserInterface {
    name: string,
    email: string,
    role: string,
    id: string,
    tokenId: string
}

export enum Roles {
    ADM = "adm",
    USER = "user"
}

export type LayoutMapping = {
    [node: string]: {
        [dimension: string]: number;
    };
}
