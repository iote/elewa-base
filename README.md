# The Elewa Base

This project contains the source code of the Elewa Base. The Architecture and Stack on which Elewa Applications are run. This project can be used as a template for projects that want to work with both Angular and NestJS. Documentation is still **under construction**, but code documentation is available on GitHub and in the source code files. 

The application is split into two a front end and back end project. Both are needed to successfully run the application.

## Getting Started
To get started, make sure you installed Node.JS and fork this repo from GitHub. Then follow the instructions below to run the application.

## Running the application

### 1. The Tools
The LMS does not need many tools to run. Be sure to install Node.JS. In documentation, we will use yarn as a package manager. This can be installed using `npm install -g yarn`. NPM can also be used to run the system. For development purposes however, we advise the usage of yarn.

### 2. The Elewa LMS Back End

The Backend is based on the magnificent work of the people behind Nest.JS - https://github.com/nestjs/nest

To run the elewa LMS, we first need to run the backend. Follow the following steps:

#### 1) Configure the database
  1. Install MongoDB on your local machine or create a test database on https://www.mongodb.com/cloud/atlas
  
  2. Navigate to `/elewa-backend/src/base/config`
  
  3. Add a new file inside this folder called `db.connectionstring.ts. *For security purposes, this file is excluded from git using .gitignore*
  
  4. Put the connection string in the file, in the following format 
  `export const connString = "{{ mongodb connection string (Older format < 3.4) }}";`

  5. Don't worry about seeding the database. Our fixtures will do that automatically for you on server load :)

#### 2) Run the backend server
Navigate with shell/cmd to `/elewa-backend` and execute `yarn run start`. The backend will now be running at `http://localhost:3000/`. 


### The Elewa LMS Front End

The front end is created using Angular - http://angular.io. To start the front end, make sure the backend is running first. Run `ng serve` in your console with `/elewa-frontend` as location. 

Navigate to `http://localhost:4200/` and start learning.
