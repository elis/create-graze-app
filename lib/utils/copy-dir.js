'use strict';

const path = require('path');
const Promise = require('promise');
const messages = require('../messages');
const output = require('./output');
const fs = require('fs-extra');

module.exports = function copyDir(opts) {
  const templatePath = opts.templatePath;
  const projectPath = opts.projectPath;
  const projectName = opts.projectName;
  const upgrade = opts.upgrade
  const overwrite = {overwrite: !!upgrade}

  console.log(upgrade ? messages.overwriting(projectName) : messages.copying(projectName));

  return new Promise(function(resolve, reject) {
    const stopCopySpinner = output.wait('Copying files');

    fs.copy(templatePath, projectPath, overwrite)
      .then(function() {
        return fs.move(
          path.resolve(projectPath, './gitignore'),
          path.resolve(projectPath, './.gitignore'),
          overwrite
        );
      })
      .then(function() {
        stopCopySpinner();
        output.success(
          `Created files for "${output.cmd(projectName)}" graze app`
        );
        return this;
      })
      .then(resolve)
      .catch(function(err) {
        console.error(err);
        stopCopySpinner();
        output.error('Copy command failed, try again.');
        reject(err);
        process.exit(1);
      });
  });
};
