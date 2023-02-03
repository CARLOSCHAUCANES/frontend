export class ResponseServe{
    public message:string = '';
    public response:any = '';
    public status:number = 0;

    constructor(message:string,response:any,status:number){
        this.message = message;
        this.response = response;
        this.status = status;
    }

    public getResponse(){
        return {
            'message':this.message,
            'response':this.response,
            'status':this.status
        }
    }
}

