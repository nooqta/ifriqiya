
export class Field {
    name: string;
    type: string;
    arguments: string[] = [];
    options: any[] = [];
    constructor(){
        this.type = 'string';
        this.options.push({key:'nullable', value:''});
    }
}
