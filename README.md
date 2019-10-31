# Ifriqiya

Ifriqiya is Laravel Models and migrations bulk generator. You can now create multiple models migration at the same. Ifriqiya uses Angular 8 and NestJs. The UI generator create a json file to be used along Larifriqiya artisan command.

# Demo
A demo can be found at the following link

https://ifriqiya.noqta.tn/

![Ifriqiya Demo](src/assets/img/captured.gif?raw=true "إفريقيا")

# Dependencies

- node
- npm
- angular-cli
- NestJs

In order to generate the models and migration on your project, you will need also the following Laravel package installed:

[Larifriqiya](https://github.com/nooqta/larifriqiya)

# Usage

In order to start using the generatorm as a regular Angular 8 cli project, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

The generator will create a json file. Provide the file to the Larifiriqiya command as follow

`php artisan ifriqiya:migration yourjsonfile.json`

This will create the models and migration found in the json file.

The project is an initial POC and we are looking toward adding more features.