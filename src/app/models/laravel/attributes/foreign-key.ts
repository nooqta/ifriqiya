export class ForeignKey {
    column: string;
    references: string;
    on: string;
    onDelete: string;
    onUpdate: string;
    constructor() {
        this.references = 'id';
        this.onDelete = 'cascade';
        this.onUpdate = 'cascade';
    }
}
