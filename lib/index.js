'use strict';

const path = require('path');
const fs = require('fs');
const copyDir = require('./utils/copy-dir');
const install = require('./utils/install');
const loadExample = require('./utils/load-example');
const messages = require('./messages');
const installGraze = require('./utils/install-graze')

module.exports = function createGrazeApp(opts) {
  const projectName = opts.projectName;
  const herokuApp = opts.herokuApp;
  const graphCms = opts.graphCms;

  if (!projectName || !herokuApp || !graphCms) {
    console.log(messages.missingProjectName());
    process.exit(1);
  }


  if (fs.existsSync(projectName)) {
    console.log(messages.alreadyExists(projectName));
    process.exit(1);
  }

  const projectPath = (opts.projectPath = process.cwd() + '/' + projectName);

  if (opts.example) {
    loadExample({
      projectName: projectName,
      example: opts.example,
    }).then(installWithMessageFactory(opts, true));
  } else {
    const templatePath = path.resolve(__dirname, '../templates/default');

    copyDir({
      templatePath: templatePath,
      projectPath: projectPath,
      projectName: projectName,
    })
    // .then(function() {
    //     console.log('what the test?', herokuApp)
    //     return installGraze({
    //       templatePath,
    //       projectPath,
    //       projectName,
    //       herokuApp,
    //       graphCms})
    //   })
      .then(installWithMessageFactory(opts))
      .catch(function(err) {
        throw err;
      });
  }
};

function installWithMessageFactory(opts, isExample = false) {
  const projectName = opts.projectName;
  const projectPath = opts.projectPath;

  const grazedeps = [
    'razzle-heroku',
    'apollo-client',
    'react-apollo',
    'apollo-cache-inmemory',
    'apollo-link-http',
    'graphql-tag',
    'graphql',
    'styled-components'
  ]

  return function installWithMessage() {
    return install({
      projectName: projectName,
      projectPath: projectPath,
      herokuApp: opts.herokuApp,
      graphCms: opts.graphCms,
      packages: isExample
        ? ['razzle', ...grazedeps]
        : ['react', 'react-dom', 'react-router-dom', 'razzle', 'express', ...grazedeps],
    })
      .then(function() {
        console.log(messages.start(projectName));
      })
      .catch(function(err) {
        throw err;
      });
  };
}
