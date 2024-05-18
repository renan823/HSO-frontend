import axios from "axios";
import { ServerResponse } from "./interfaces";

axios.interceptors.request.use()

class ServerRequest {

    private method: string;
    private endpoint: string;
    private payload: object;
    private url: string = "http://localhost:5000/api";
    private headers: object;
    private token: string = "";

    constructor (method: string, end: string, payload: object = {}, headers: object = {}) {
        this.method = method;
        this.endpoint = end;
        this.payload = payload;
        this.url = this.url + this.endpoint;
        this.headers = headers;
    }

    setToken (token: string) {
        this.token = token;
        this.headers = { ...this.headers, Authorization: `Bearer ${token}` };
    }

    async handle (): Promise<ServerResponse> {
        try {
            const { data, status } = await axios({ url: this.url, headers: this.headers, method: this.method, data: this.payload });

            return { data, status };
        } catch (error: any) {
            switch (error.response.status) {
                case 401:
                    return { data: { message: "Autenticação inválida" }, status: 401 };
                default:
                    return { data: { message: "Algo deu errado" }, status: 500 };
            }
        }
    }

}

export default ServerRequest;