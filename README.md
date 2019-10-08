# Ifriqiya (Arabic: إفريقية‎ Ifrīqya)

This is an experimental project that  intends to generate a (web|mobile|desktop) application based on predefined entitities. An entity depends on the type of framework/ library selected during the design phase.
The first version will generate Laravel version 6.0 related entities. The entities the project will help you generate are: 

- Models
- Migrations

## Running the app
In order to run the application run

`ng serve --open`

## Generating the entities

You can create the models and related attributes thru the web interface. Upon finishing the design of the models, you can generate the schema of the design. A json file will be generated. You should then place the file within your Laravel project
In order to create the models and migration. the larifriqiya package is required. Execute the following command to generate the models and migration:

`php artisan ifriqiya:install`


## Requirements

The use of this project has two dependencies in order to generate the entities:

- Angular cli to run the generator on your server.
- And larifriqiya Laravel package to generate the entities



## Future features

### Version 1

- Integrate more Laravel entities: 
    - Seeds,
    - Controllers,
    - views,
    - factories,
    ...

- Give the user the option to:
    - Download a new laravel project including the generated entities
    - Specify Laravel version
    - Download only the entities
    - Update an existing schema and download updated entities
    - Import/Export a schema


### Version 2

- Choose a type of project: Laravel, Symfony, Codeigniter, Angular, React, Vue, Django (We'll integrate only one or two project type for version 2)
- Let developer contribute with type of project by defining a project type, related entities and templates to be used to generate entities

