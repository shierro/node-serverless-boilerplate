# NodeJS Serverless Boilerplate

[![Greenkeeper badge](https://badges.greenkeeper.io/shierro/node-serverless-boilerplate.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/shierro/node-serverless-boilerplate.svg?branch=master)](https://travis-ci.org/shierro/node-serverless-boilerplate)
[![Maintainability](https://api.codeclimate.com/v1/badges/a6fbd06ef529c7af570f/maintainability)](https://codeclimate.com/github/shierro/node-serverless-boilerplate/maintainability)
[![codecov](https://codecov.io/gh/shierro/node-serverless-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/shierro/node-serverless-boilerplate)
[![dependency status](https://david-dm.org/shierro/node-serverless-boilerplate/status.svg)](https://david-dm.org/shierro/node-serverless-boilerplate/status.svg)
[![devDependency status](https://david-dm.org/shierro/node-serverless-boilerplate/dev-status.svg)](https://david-dm.org/shierro/node-serverless-boilerplate/dev-status.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/shierro/node-serverless-boilerplate/badge.svg)](https://snyk.io/test/github/shierro/node-serverless-boilerplate)


- Opinionated NodeJS boilerplate for a AWS serverless app

## Why would you want to use this boilerplate?
- You plan to use DynamoDB as your data storage
- You want to use an ORM
- You want to use a simple `x-api-token` as your authorizer
- You want to leverage ExpressJS(for a lot of good reasons) on a serverless environment
- You want to be able to work locally on your machine
- You want to bundle you app before you deploy
- You want to prevent your app from having cold starts
- You want to be able to version your app & save last X number of versions(3 default)

## This boilerplate has the following modules/plugins included

### Modules - Application layer
- serverless-http - Enable an express app to work seamlessly with serverless  
- dynogels - DynamoDB ORM
- Dotenv-safe - environment manager
- Mocha / nyc - Testing / cover
- Eslint - linter - Base:AirBnB
- Winston - Logger

### Plugins - Serverless layer
  - serverless-dotenv-plugin
  - serverless-dynamodb-local
  - serverless-dynamodb-autoscaling
  - serverless-plugin-optimize
  - serverless-domain-manager
  - serverless-add-api-key
  - serverless-prune-plugin
  - serverless-plugin-warmup
  - serverless-offline

## Requirements
  - NodeJS v7.6+
  - Yarn v1.5+

## Set-up & install
```
$ yarn global add serverless
$ git clone https://github.com/shierro/node-serverless-boilerplate <project_name>
$ cd <project_name> && yarn install
$ yarn db:install
```
## Cuztomize serverless config
```
$ cp serverless-template.yml serverless.yml
```
Change serverless.yml dummy config to match your needs.

## Set your Environment vars
```
$ cp .env.example .env
```
Change .env vars with the actual values

## Serverless Dev(offline) mode
```
$ STAGE=dev API_KEY=LOCAL yarn start
```

## Deploy your application
```
$ /* Deploy to dev */
$ APP_ROUTE=users STAGE=dev yarn deploy

$ /* Deploy to staging */
$ APP_ROUTE=users STAGE=staging yarn deploy

$ /* Deploy to prod */
$ APP_ROUTE=users STAGE=prod yarn deploy
```

## run unit tests & generate coverage
```
$ yarn cover
```

