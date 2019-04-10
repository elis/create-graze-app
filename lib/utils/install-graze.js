'use strict';

const execa = require('execa');
const path = require('path');
const Promise = require('promise');
const messages = require('../messages');
const output = require('./output');
const fs = require('fs-extra');

module.exports = function installGraze(opts) {
  const templatePath = opts.templatePath;
  const projectPath = opts.projectPath;
  const projectName = opts.projectName;
  const herokuApp = opts.herokuApp;
  const graphCms = opts.graphCms;

  console.log(messages.copying(projectName));

  return new Promise(function(resolve, reject) {
    const stopGrazeSpinner = output.wait('Configuring services');

    output.info('Check Heroku app...')
    try {
      execa.sync('heroku', ['config', '-j', '-a', herokuApp])
    } catch (err) {
      console.error(err.message);
      stopGrazeSpinner();
      output.info(messages.missingHerokuApp(herokuApp))
      output.error(`Heroku app "${herokuApp}" not found or inaccessible`);
      reject(err);
      process.exit(1);
    }

    output.info('Writing env variables...')
    fs.writeFile(
      path.resolve(projectPath, './.env.development.local'),
      `RAZZLE_GRAPHCMS_API=${graphCms}`
    )
    .then(function() {
      output.info('Creating Procfile...')
      return fs.writeFile(
        path.resolve(projectPath, './Procfile'),
        `web: npm run start:prod`
      )
    })
    .then(function() {
      output.info('Initializing git...')
      return execa('git', ['init'])
    })
    .then(function() {
      output.info('Adding heroku...')
      return execa('heroku', ['git:remote', '-a', herokuApp])
    })
    .then(function() {
      output.info('Configuring heroku...')
      return execa('heroku', ['config:set', '-a', herokuApp, `RAZZLE_GRAPHCMS_API=${graphCms}`])
    })
    .then(function() {
      stopGrazeSpinner();
      output.success(
        `Created files and configurations for "${output.cmd(projectName)}" graze app`
      );
      return this;
    })
    .then(resolve)
    .catch(function(err) {
      console.error(err);
      stopGrazeSpinner();
      output.error('Install command failed, try again.');
      reject(err);
      process.exit(1);
    });
  });
};
