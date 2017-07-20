# DailyRandomScheduler

DailyScheduler is a small Angular2-Application to schedule your daily activities randomly based on some predefined choices. Those can be arranged into different groups e.g. "Working Projects" or "Games". The random selection is seeded with the MD5 hash of the formatted date for the particular day (e.g. "31-01-2017"). This ensure that the selection is consistent for each day on multiple application launches.

**Why randomly?** This app was mainly designed for people that have mutliple things that they can tackle each day, but cannot decide on a particular activity. So we let the randomness decide (or at least suggest) what to do. 

Want to manually plan what your daily activities? Well then this is not the right app for you.

## Commands

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

### Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
