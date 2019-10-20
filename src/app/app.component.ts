import { environment } from './../environments/environment';
import { LaravelEntity } from './models/laravel/laravel-entity';
import { fieldTypes, relationshipTypes, fieldOptions } from './models/laravel/common';
import { Model } from './models/laravel/model';
import { Project } from './models/project';
import { Component, OnInit } from '@angular/core';
import { Field } from './models/laravel/attributes/field';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { ForeignKey } from './models/laravel/attributes/foreign-key';
import { Relationship } from './models/laravel/attributes/relationship';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  project: Project;
  model: Model;
  fieldTypes: any;
  fields: string[];
  relationshipTypes: string[];
  classes: any[];
  isEditMode = false;
  currentIndex = 0;
  fieldOptions: string[];
  constructor(public http: HttpClient){

  }
  ngOnInit(): void {
    this.project = new Project();
    this.model = new Model();
    this.fieldTypes = fieldTypes;
    this.relationshipTypes = relationshipTypes;
    this.fields = [];
    this.classes = [];
    this.fieldOptions = fieldOptions;
  }

  addField() {
    this.model.fields.push(new Field());
  }

  removeField(index) {
    this.model.fields.splice(index, 1);
    this.getFields();
  }

  saveModel() {
    this.project.entities.models.push(this.model);
    this.model = new Model();
    this.getClasses();
  }

  resetModel(){
    this.model = new Model();
  }

  removeModel(index) {
    this.project.entities.models.splice(index,1);
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
  }

  addFieldArgument(i){
    this.model.fields[i].arguments.push('');
    this.model.fields[i].arguments = JSON.parse(JSON.stringify(this.model.fields[i].arguments));

  }
  
trackByFieldArgument(index, item) {
return index;
}
  removeFieldArgument(i,j){
this.model.fields[i].arguments.splice(j,1);
  }

  addFieldOption(i){
    this.model.fields[i].options.push({key: '', value: ''});
    this.model.fields[i].options = JSON.parse(JSON.stringify(this.model.fields[i].options));

  }
  
trackByFieldOption(index, item) {
return index;
}
  removeFieldOption(i,j) {
this.model.fields[i].options.splice(j,1);
  }

  addForeignKey() {
    this.model.foreign_keys.push(new ForeignKey());
  }
  removeForeignKey(index) {
    this.model.foreign_keys.splice(index, 1);
  }
  getFields() {
    this.fields = Array.from(this.project.entities.models, (model: Model) => `${model.name.toLowerCase()}s`);
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

  removeRelationshipArgument(i,j){
    this.model.relationships[i].arguments.splice(j,1);
      }

  trackByRelationArgument (index, item) {
    return index;
}

  getClasses() {
    this.classes = Array.from(this.project.entities.models, (model: Model) => `${model.namespace}\\${model.name}`);
  }

  downloadJson() {
    this.project.entities.models.forEach(model => {
      model.fillable = this.getModelFields(model);
    });
    this.http.post('api/laravel/json',{ models: this.project.entities.models }).subscribe((res: any) =>{
      const uri = res.uri;
      window.open( environment.apiUrl + uri, '_blank');
    });
  }
}
