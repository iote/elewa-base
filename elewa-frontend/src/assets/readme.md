# Assets

This folder contains all static assets available in the system. 
Mainly styling and display purposes.

Notable in this part of the application is theming, described below.

## Contained sections

### images 
Collection of static images used in the system.

### Styles
1. styles.css
Contains some global styling options. Defines classes available throughout the whole system (watch out for CSS bleed!).

2. elewa-theme.scss 
Contains the theming of the elewa application
  - Base theme: Used at login and on the home pages (before navigating into a subject)
  - Subject themes: Because every subject is thaught differently, we want every subject to feel like a different app. Therefore, we define a different theme for every subject. 
  
### Theming a subject
To theme the different subject, we rely on the theming engine built by angular material. An in depth guide can be found here: https://material.angular.io/guide/theming

We make this theming dynamic compared to which subject they are in by using subject slugs. Every subject has a slug or special keyword that belongs to it. That slug is part of the subject schema found in root/elewa-backend/src/modules/curriculum/model - subject.

A theme can then be created using the angular material scss functions and the slug name.
Example:
```scss
  ${{ subject.slug }}-primary:  mat-palette($mat-purple);
  ${{ subject.slug }}-accent:   mat-palette($mat-teal, A400, A100, A400);
  ${{ subject.slug }}-theme:    mat-light-theme(${{ subject.slug }}-primary, 
                                                ${{ subject.slug }}-accent, 
                                                $elewa-warn);      
/* Theme properties. */
.{{ subject.slug }}-background { background-color: mat-color(${{ subject.slug }}-primary, 400); }
.{{ subject.slug }}-theme {
  @include angular-material-theme(${{ subject.slug }}-theme);
}
```

The special classes defined as theme properties are used to set the theme for a section of the application.

This means that we can also for example only theme parts of the application, by applying .{{ subject.slug }}-theme to the parent component. *(Can be used to e.g. include a reference or link of the topic chemistry with biology. Keep main part of the UI about chemistry, create container with .biology-theme to contain a card talking about biology.*