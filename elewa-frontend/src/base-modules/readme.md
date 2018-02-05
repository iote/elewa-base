# Base Modules

This folder contains two things.
    1.  Layers of indirection for Third Party Modules.
        To avoid being dependent on Third Party Implementations, we create for each Third Part module our own module that exports it. 
        
        Should a Third Party module become unsupported, we only need to swap it out in one place.

    2.  Core Module
        Some components and directives (e.g. navbar, angular material, flex layout) are used all over the place. Instead of importing them in each module they belong to, we again create a layer of indirection and package them into a base UI module.

The main use of this folder is to provide central access to all many used components, directives and services.

## Contained modules

### Bricks 
    - Base Components used by almost all modules. These include custom NavBars, Toolbars, Custom Tiles, .. Have no dependencies to other libraries at all.

    - Component Prefix: **brick-..**

### Material Design
    - Imports the material design library. Layer of indirection
    - Component Prefix: **mat-..**
    - Source: https://github.com/angular/material2

### Material-Bricks
    - Base Components used by almost all modules that have a dependency on Angular Material
    - Component Prefix: **brick-..**

### Flex Layout
    - Imports the Flex Layout library. Layer of indirection
    - Directive Prefix: **fx**
    - Source: https://github.com/angular/flex-layout

## Core Module
Exports all commonly used UI and service modules (used by all main modules).

Imported by all main modules.