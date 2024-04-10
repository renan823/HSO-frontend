import axios from "axios";
import ServerResponse from "./ServerResponse";

class ServerRequest {

    private method: string;
    private endpoint: string;
    private payload: object;
    private url: string = "http://localhost:5000/api";
    private headers: object;

    constructor (method: string, end: string, payload: object = {}, headers: object = {}) {
        this.method = method;
        this.endpoint = end;
        this.payload = payload;
        this.url = this.url + this.endpoint;
        this.headers = headers;
    }

    async handle (): Promise<ServerResponse> {
        try {
            const response = await axios({ url: this.url, headers: this.headers, method: this.method, data: this.payload });

            return new ServerResponse(response.data, response.status);
        } catch (error: any) {
            return new ServerResponse({ message: "Algo deu errado" }, 500);
        }
    }

}

export default ServerRequest;