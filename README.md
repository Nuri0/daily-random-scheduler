# DailyRandomScheduler

DailyScheduler is a small Angular2-Application to schedule your daily activities randomly based on some predefined choices. Those can be arranged into different groups e.g. "Working Projects" or "Games". The random selection is seeded with the MD5 hash of the formatted date for the particular day (e.g. "31-01-2017"). This ensures that the selection is consistent for each day on multiple application launches.

**Why randomly?** This app was mainly designed for people that have mutliple things or projects that they can tackle each day, but cannot decide on a particular activity. So we let the randomness decide (or at least suggest) what to do. 

Want to manually plan your daily activities? Well then this is not the right app for you.

## Commands

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
