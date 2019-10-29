import { environment } from './../environments/environment';
import { LaravelEntity } from './models/laravel/laravel-entity';
import { fieldTypes, relationshipTypes, fieldOptions } from './models/laravel/common';
import { Model } from './models/laravel/model';
import { Project } from './models/project';
import { Component, OnInit } from '@angular/core';
import { Field } from './models/laravel/attributes/field';
import { ForeignKey } from './models/laravel/attributes/foreign-key';
import { Relationship } from './models/laravel/attributes/relationship';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  project: Project;
  model: Model;
  field: Field;
  fieldTypes: any;
  fields: string[];
  relationshipTypes: string[];
  classes: any[];
  isEditMode = false;
  isFieldEditMode = false;
  currentIndex = 0;
  fieldOptions: string[];
  modalRef: BsModalRef;
  importedModels: any;
  nullable = true;
  unsigned = false;
  constructor(public http: HttpClient, private modalService: BsModalService) {

  }
  ngOnInit(): void {
    this.project = new Project();
    this.model = new Model();
    this.field = new Field();
    this.fieldTypes = fieldTypes;
    this.relationshipTypes = relationshipTypes;
    this.fields = [];
    this.classes = [];
    this.fieldOptions = fieldOptions;
  }

  addField() {
    this.model.fields.push(this.field);
    this.saveAndResetField();
  }
  updateField() {
    this.isFieldEditMode = false;
    this.model.fields[this.currentIndex] = this.field;
    this.currentIndex = 0;
    this.saveAndResetField();
  }

  private saveAndResetField(){
    this.model = JSON.parse(JSON.stringify(this.model));
    this.field = new Field();
    this.modalRef.hide();
  }

  resetField() {
    this.field = new Field();
  }

  removeField(index) {
    this.model.fields.splice(index, 1);
    this.model = JSON.parse(JSON.stringify(this.model));
  }

  reorderFields(e) {
    this.model.fields = e;
  }
  dropField(e) {
      console.log(e);
  }

  reorderModels(e) {
    this.project.entities.models = e;
  }



  saveModel() {
    this.project.entities.models.push(this.model);
    this.project.entities.models = JSON.parse(JSON.stringify(this.project.entities.models));
    this.model = new Model();
    this.getClasses();
    this.getFields();
  }

  resetModel() {
    this.model = new Model();
  }

  removeModel(index) {
    this.project.entities.models.splice(index, 1);
    this.getFields();
  }

  editModel(index) {
    this.model = this.project.entities.models[index];
    this.isEditMode = true;
    this.currentIndex = index;
  }

  updateModel() {
    this.project.entities.models[this.currentIndex] = this.model;
    this.isEditMode = false;
    this.currentIndex = 0;
    this.model = new Model();
    this.getFields();
  }

  addFieldArgument() {
    this.field.arguments.push('');
    this.field.arguments = JSON.parse(JSON.stringify(this.field.arguments));

  }

  trackByFieldArgument(index, item) {
    return index;
  }
  
  removeFieldArgument(j) {
    this.field.arguments.splice(j, 1);
  }

  addFieldOption() {
    this.field.options.push({ key: '', value: '' });
    this.field.options = JSON.parse(JSON.stringify(this.field.options));

  }

  trackByFieldOption(index, item) {
    return index;
  }

  removeFieldOption(j) {
    this.field.options.splice(j, 1);
  }

  addForeignKey() {
    this.model.foreign_keys.push(new ForeignKey());
  }
  removeForeignKey(index) {
    this.model.foreign_keys.splice(index, 1);
  }
  getFields() {
    this.fields = Array.from(this.project.entities.models, (model: Model) => `${model.name.toLowerCase()}`);
  }

  get columns(): Array<any> {
    return this.model.fields.filter(field => field.name.includes('_id'));
  }

  getModelFields(model) {
    return Array.from(model.fields, (field: Field) => `${field.name.toLowerCase()}`);
  }

  addRelationship() {
    this.model.relationships.push(new Relationship());
  }
  removeRelationship(index) {
    this.model.relationships.splice(index, 1);
  }
  addRelationshipArgument(i) {
    this.model.relationships[i].arguments.push('');
    this.model.relationships[i].arguments = JSON.parse(JSON.stringify(this.model.relationships[i].arguments));
  }

  removeRelationshipArgument(i, j) {
    this.model.relationships[i].arguments.splice(j, 1);
  }

  trackByRelationArgument(index, item) {
    return index;
  }

  getClasses() {
    this.classes = Array.from(this.project.entities.models, (model: Model) => `${model.namespace}\\${this.capitalize(model.name)}`);
  }

  downloadJson() {
    this.project.entities.models.forEach(model => {
      model.fillable = this.getModelFields(model);
    });
    this.http.post('api/laravel/json', { models: this.project.entities.models }).subscribe((res: any) => {
      const uri = res.uri;
      window.open(environment.apiUrl + uri, '_blank');
    });
  }

  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  editFieldModal(index, template) {
    this.field = this.model.fields[index];
    this.isFieldEditMode = true;
    this.currentIndex = index;
    this.nullable = typeof (this.field.options.includes('nullable')) != 'undefined';
    this.unsigned = typeof (this.field.options.includes('unsigned')) != 'undefined';

    this.modalRef = this.modalService.show(template);
  }

  UpdateFieldArgumentsChecked(arg, value){
    const index: any = this.field.options.findIndex(option => option.key == arg);
    console.log(index);
    const argExists = index > -1;
    if(argExists && !this[arg]) {
      this.field.options.splice(index, 1);
      
    }
    if(!argExists && this[arg]) {
      this.field.options.push({key: arg, value: ''});
    }
    this.field = JSON.parse(JSON.stringify(this.field));
  }

  modelDropped(e){
    const model = e;
    
    // Add field
    let field = new Field();
    field.name = model.name.toLowerCase() + '_id';
    field.type = 'integer';
    field.options.push('unsigned');
    this.model.fields.push(field);

    // Add foreign key
    let foreignKey = new ForeignKey();
    foreignKey.column = field.name;
    foreignKey.on = model.name.toLowerCase();
    foreignKey.onDelete = 'cascade';
    foreignKey.onUpdate = 'cascade';
    this.model.foreign_keys.push(foreignKey);

    // Add relationship
    let relationship = new Relationship();
    relationship.name = model.name.toLowerCase();
    relationship.type = 'belongsTo';
    relationship.class = `${model.namespace}\\${this.capitalize(model.name)}`;
    this.model.relationships.push(relationship);
    
    // Update model
    this.model = JSON.parse(JSON.stringify(this.model));
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  import() {
    let data = JSON.parse(this.importedModels);
    this.project.entities.models = data;
    this.getFields();
    this.getClasses();
    this.modalRef.hide();
  }
}
