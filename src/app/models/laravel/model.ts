import { Field } from './attributes/field';
import { ForeignKey } from './attributes/foreign-key';
import { Relationship } from './attributes/relationship';
import { Validation } from './attributes/validation';

export class Model {
    name: string;
    namespace: string;
    softDelete: boolean;
    fillable: string[];
    fields: Array<Field>;
    // tslint:disable-next-line:variable-name
    foreign_keys: Array<ForeignKey>;
    relationships: Array<Relationship>;
    validations: Array<Validation>;
    constructor() {
        this.softDelete = true;
        this.fields = [];
        this.foreign_keys = [];
        this.relationships = [];
        this.validations = [];
    }
}
