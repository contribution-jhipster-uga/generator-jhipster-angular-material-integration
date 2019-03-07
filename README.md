# generator-jhipster-angular-material-integration
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, Module for installing the dependencies needed to use Angular Material in a Jhipster project.

# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

This generator allows you to set up and download the dependencies necessary to use Angular Material. 

![Sample application](image/sample-application.png)

You can find a sample application using this generator [here](https://github.com/contribution-jhipster-uga/sample-application-angular-material).

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

# Installation

## With Yarn

To install this module:

```bash
yarn global add generator-jhipster-angular-material-integration
```

To update this module:

```bash
yarn global upgrade generator-jhipster-angular-material-integration
```

## With NPM

To install this module:

```bash
npm install -g generator-jhipster-angular-material-integration
```

To update this module:

```bash
npm update -g generator-jhipster-angular-material-integration
```

# Usage

First, you have to run the generator using the following command :

```bash
yo jhipster-angular-material-integration
```

Please check that @angular/animations, @angular/cdk, @angular/flex-layout, @angular/material and hammerjs has been added to your package.json. If not, please add it yourself with version "latest" (example: "@angular/animations": "latest") and execute npm install.
Now you have all the necessary elements to use Angular Material's tools : [Angular Material Website](https://v6.material.angular.io/).

# How

This generator will first add a jh-material.module.ts file, which imports all material component, in Shared folder.
This module will then be imported in shared.module.ts :
```bash
import {JhMaterialModule} from \'app/shared/jh-material.module\';
```
BrowserAnimationsModule and hammerjs (which is not necesary but useful for some components) are imported in app.module.ts file :
```bash
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
```
Then, it imports a css-theme in your vendor.scss.

Finally, it adds hammerjs, @angular/material, @angular/flex-layout, @angular/cdk and @angular/animations to your package.json and launch an install.

# License

MIT © [Contribution Jhipster UGA](https://github.com/contribution-jhipster-uga)
Julien Courtial, Hugo Gros-Daillon, Cédric Lafrasse, Bastien Terrier

This generator has been inspired by the tutorial of [Cyril Casaucau](https://medium.com/@cyril.casaucau/how-to-add-angular-material-on-an-jhipster-5-x-app-97c9569c9f97).

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-angular-material-integration.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-angular-material-integration
[travis-image]: https://travis-ci.org/contribution-jhipster-uga/generator-jhipster-angular-material-integration.svg?branch=master
[travis-url]: https://travis-ci.org/contribution-jhipster-uga/generator-jhipster-angular-material-integration
[daviddm-image]: https://david-dm.org/contribution-jhipster-uga/generator-jhipster-angular-material-integration.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/contribution-jhipster-uga/generator-jhipster-angular-material-integration
