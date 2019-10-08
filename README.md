# Ifriqiya (Arabic: إفريقية‎ Ifrīqya)

This is an experimental project that  intends to generate a (web|mobile|desktop) application based on predefined entitities. An entity depends on the type of framework/ library selected during the design phase.
The first version will generate Laravel version 6.0 related entities. The entities the project will help you generate are: 

- Models
- Migrations

In order to run the application
ng serve --open

The user can create the models and related attributes thru the web interface. Upon finishing the design of the models, the user can generate the schema of the design. A json file will be generated. The user will place the file within his/her Laravel project
In order to create the models and migration. the larifriqiya package is required. Execute the following command to generate the models and migration:

php artisan ifriqiya:install


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
