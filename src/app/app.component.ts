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
  currentIndex = 0;
  fieldOptions: string[];
  modalRef: BsModalRef;
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
    this.isEditMode = false;
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
    if(['nullable', 'unsigned'].includes(this.field.arguments[j])) this[this.field.arguments[j]] = false;
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
    this.classes = Array.from(this.project.entities.models, (model: Model) => `${model.namespace}\\${model.name}`);
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

  addFieldModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  editFieldModal(index, template) {
    this.field = this.model.fields[index];
    this.isEditMode = true;
    this.currentIndex = index;
    this.modalRef = this.modalService.show(template);
  }

  UpdateFieldArgumentsChecked(arg, value){
    console.table(this.field);
    const index: any = this.field.arguments.find(argument => argument == arg);
    const argExists = typeof index != 'undefined';
    if(argExists && !value) {
      this.field.arguments.splice(index, 1);
    }
    if(!argExists && value){
      this.field.arguments.push(arg);
    }
  }
}
