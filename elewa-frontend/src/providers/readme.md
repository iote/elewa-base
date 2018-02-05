# Providers

This folder contains providers (services) that are used globally throughout the system.

## Contained Providers

### Logger
Set of loggers supported by the system.

To choose the logger that will be used system wide, configure app/app.module and select which one needs to be used.

### Graphql 
Middleware required to communicate with a graphql server.

Includes:
  - Graphql service - Broker between all communication with the graphql server.
  - Graphql init service - Service used on application bootstrap to configure graphql broker.

### Transclusion Helper
Provider that contains some functions which are useful when working with transclusive components. *e.g. check if a component is empty.*
