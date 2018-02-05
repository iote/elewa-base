# Elewa LMS Frontend

This project contains the front end of the elewa LMS (http://elewa.co.ke). It is a cutting edge LMS that is adapted and optimised to run on any device. Further documentation about the usage is **under construction**.

## Running the application

To start the front end, make sure the backend is running first. Run `ng serve` in your console with `/elewa-frontend` as location (cd). Navigate to `http://localhost:4200/`. The app is built using angular-cli, which means it used WebPack. Webpack makes sure the application will automatically reload if you change any of the source files.

## The Application Structure
The application is structured in the following way:

### main.ts & index.html
main.ts is the entry point of the application, kicking off webpack and loading in the starting point of the angular application -> app/app.module

index.html is the html frame in which the app resides. Used for adding global styles and fonts, and for setting meta in the header of the Single Page Application.

### app
This folder contains the logic to bootstrap the application. App.module is the Root Module of the Angular application.

If new modules are created that are accessible from root (e.g. through routing), they need to be added to app.module.

### assets
Static assets and application/subject theming.

### base-modules
Building blocks on which the application is built. Also contains layers of indirection for external libraries used in the system.

### modules
Modules contain the actual logic of the application. They contain the logic and flow that the user will interact with. All front-end application logic is contained in one of these modules.

### providers
Services * (e.g. logger, backend service broker, ...)* that are used application wide. They are singletons defined as providers into the root module, and injected into the components that require them.

### routes
Definition of the routes and flow of the application
