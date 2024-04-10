class ServerResponse {

    private data: any;
    private status: number;

    constructor (data: any, status: number) {
        this.data = data;
        this.status = status;
    }

    getData (): any {
        return this.data;
    }

    getStatus (): number {
        return this.status;
    }
}

export default ServerResponse;