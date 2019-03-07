const chalk = require('chalk');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const jhipsterUtils = require('generator-jhipster/generators/utils');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                }
            },
            readConfig() {
                this.jhipsterAppConfig = this.getAllJhipsterConfig();
                if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster angular-material-integration')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }

    writing() {
        // function to use directly template
        this.template = function(source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        // read config from .yo-rc.json
        this.baseName = this.jhipsterAppConfig.baseName;
        this.packageName = this.jhipsterAppConfig.packageName;
        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.buildTool = this.jhipsterAppConfig.buildTool;

        // use function in generator-base.js from generator-jhipster
        this.angularAppName = this.getAngularAppName();

        // use constants from generator-constants.js
        const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
        const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;


        // // show all variables
        // this.log('\n--- some config read from config ---');
        // this.log(`baseName=${this.baseName}`);
        // this.log(`packageName=${this.packageName}`);
        // this.log(`clientFramework=${this.clientFramework}`);
        // this.log(`clientPackageManager=${this.clientPackageManager}`);
        // this.log(`buildTool=${this.buildTool}`);
        //
        // this.log('\n--- some function ---');
        // this.log(`angularAppName=${this.angularAppName}`);
        //
        // this.log('\n--- some const ---');
        // this.log(`javaDir=${javaDir}`);
        // this.log(`resourceDir=${resourceDir}`);
        // this.log(`webappDir=${webappDir}`);
        if (this.clientFramework === 'angularX' || this.clientFramework === 'angular2') {
            this.template('jh-material.module.ts', `${webappDir}app/shared/jh-material.module.ts`);
            jhipsterUtils.rewriteFile({
                file: `${webappDir}app/app.module.ts`,
                needle: 'jhipster-needle-angular-add-module-import',
                splicable: [`import { BrowserAnimationsModule } from '@angular/platform-browser/animations';`]
            }, this);
            jhipsterUtils.rewriteFile({
                file: `${webappDir}app/app.module.ts`,
                needle: 'jhipster-needle-angular-add-module-import',
                splicable: [`import {FlexLayoutModule} from '@angular/flex-layout';`]
            }, this);
            jhipsterUtils.rewriteFile({
                file: `${webappDir}app/app.module.ts`,
                needle: 'jhipster-needle-angular-add-module-import',
                splicable: [`import 'hammerjs';`]
            }, this);
            jhipsterUtils.rewriteFile({
                file: `${webappDir}content/scss/vendor.scss`,
                needle: 'jhipster-needle-scss-add-vendor',
                splicable: [`@import "~@angular/material/prebuilt-themes/indigo-pink.css";`]
            }, this);
            jhipsterUtils.rewriteFile({
                file: `${webappDir}app/shared/shared.module.ts`,
                needle: '@NgModule({',
                splicable: [`import {JhMaterialModule} from 'app/shared/jh-material.module';`]
            }, this);
            jhipsterUtils.rewriteFile({
                file: `${webappDir}index.html`,
                needle: 'jhipster-needle-add-resources-to-root',
                splicable: [`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`]
            }, this);
            jhipsterUtils.rewriteFile({
                file: `${webappDir}app/shared/shared-libs.module.ts`,
                needle: '@NgModule({',
                splicable: [`import { ReactiveFormsModule } from '@angular/forms';`]
            }, this);

            var sharedModule = this.fs.read(`${webappDir}app/shared/shared.module.ts`);
            var res = sharedModule.replace('imports: [', 'imports: [JhMaterialModule, ');
            var toWrite = res.replace('exports: [', 'exports: [JhMaterialModule, ');
            this.fs.write(`${webappDir}app/shared/shared.module.ts`, toWrite);

            var sharedLibsModule = this.fs.read(`${webappDir}app/shared/shared-libs.module.ts`);
            var res = sharedLibsModule.replace('    ],exports: [', ',ReactiveFormsModule],exports: [');
            var toWrite = res.replace('exports: [', 'exports: [ReactiveFormsModule, ');
            this.fs.write(`${webappDir}app/shared/shared-libs.module.ts`, toWrite);

            var appModule = this.fs.read(`${webappDir}app/app.module.ts`);
            var res = appModule.replace('BrowserModule,', `BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,`);
            this.fs.write(`${webappDir}app/app.module.ts`, res);

            this.addNpmDependency('@angular/animations', 'latest');
            this.addNpmDependency('hammerjs', 'latest');
            this.addNpmDependency('@angular/material', 'latest');
            this.addNpmDependency('@angular/cdk', 'latest');
            this.addNpmDependency('@angular/flex-layout', 'latest');

        }
      else{
        this.log("Error : You cannot install Angular Material to this project because you are not using Angular.");
      }
    }


    install() {
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: this.clientFramework === 'angular1',
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            this.installDependencies(installConfig);
        }
    }

    end() {
        this.log('End of angular-material-integration generator');
    }
};
