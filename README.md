# NodeJS Serverless Boilerplate

[![Greenkeeper badge](https://badges.greenkeeper.io/shierro/node-serverless-boilerplate.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/shierro/node-serverless-boilerplate.svg?branch=master)](https://travis-ci.org/shierro/node-serverless-boilerplate)
[![Maintainability](https://api.codeclimate.com/v1/badges/a6fbd06ef529c7af570f/maintainability)](https://codeclimate.com/github/shierro/node-serverless-boilerplate/maintainability)
[![codecov](https://codecov.io/gh/shierro/node-serverless-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/shierro/node-serverless-boilerplate)
[![dependency status](https://david-dm.org/shierro/node-serverless-boilerplate/status.svg)](https://david-dm.org/shierro/node-serverless-boilerplate/status.svg)
[![devDependency status](https://david-dm.org/shierro/node-serverless-boilerplate/dev-status.svg)](https://david-dm.org/shierro/node-serverless-boilerplate/dev-status.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/shierro/node-serverless-boilerplate/badge.svg)](https://snyk.io/test/github/shierro/node-serverless-boilerplate)


- Opinionated NodeJS boilerplate for a AWS serverless app

## Built-in modules/libraries
- serverless-http - Enable an express app to work seamlessly with serverless  
- dynogels - DynamoDB ORM
- Dotenv-safe - environment manager
- Mocha / nyc - Testing / cover
- Eslint - linter - Base:AirBnB
- Winston - Logger

## Requirements
  - NodeJS v7.6+
  - NPM v4+
  - serverless

## Serverless plugins used
  - serverless-dotenv-plugin
  - serverless-dynamodb-local
  - serverless-offline-scheduler
  - serverless-plugin-optimize
  - serverless-domain-manager
  - serverless-offline

## Set-up & install
```
$ npm install serverless -g
$ git clone https://github.com/shierro/node-serverless-boilerplate <project_name>
$ cd <project_name> && npm install
$ npm run db:install
```
## Add your serverless config
```
$ cp serverless-template.yml serverless.yml
```
Change serverless.yml dummy config according to your needs

## Set your Environment vars
```
$ cp .env.example .env
```
Change .env vars with the actual values

## Serverless Dev(offline) mode
```
$ STAGE=dev npm start
```

## Deploy your application
```
$ /* Deploy to dev */
$ APP_ROUTE=users STAGE=dev npm run deploy

$ /* Deploy to staging */
$ APP_ROUTE=users STAGE=staging npm run deploy

$ /* Deploy to prod */
$ APP_ROUTE=users STAGE=prod npm run deploy
```

## run unit tests & generate coverage
```
$ npm run cover
```

