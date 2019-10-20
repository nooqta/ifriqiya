import { LaravelEntity } from './laravel/laravel-entity';
import { Entity } from './entity';
enum Type {
    Laravel,
    Symfony,
    Django,
    Flask,
    NestJs,
    Angular2,
    VueJs,
    React,
}
export class Project {
    name: string;
    type: Type;
    entities: any;
    constructor(){
        this.type = Type.Laravel;
        switch (this.type) {
            case Type.Laravel:
                this.entities = new LaravelEntity();
                break;
        
            default:
                this.entities = new Entity();
                break;
        }
    }
}
