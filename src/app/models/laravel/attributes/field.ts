
export class Field {
    name: string;
    type: string;
    arguments: string[] = [];
    options: any[] = [];
    constructor(){
        this.type = 'string';
        this.arguments.push('nullable');
    }
}
