#!/usr/bin/env node
/* eslint import/no-dynamic-require:0, global-require:0, import/no-unresolved:0  */

/*
TODO: remove this
This hides an annoying console.log from typescript-eslint-parser which is imported by angular-gettext-tools.
*/
if (!process.logChanged) {
  process.logChanged = true;
  const warn = console.warn.bind(console); // eslint-disable-line
  console.warn = function (...args) { // eslint-disable-line
    const arg = args[0]; // eslint-disable-line
    if (typeof arg === 'string' && arg.match('not officially supported by typescript-eslint-parser')) {
      return;
    }
    warn.apply(console, args);
  };
}

const { join } = require('path');

const cwd = process.cwd();
const isInsideProcessCwd = __dirname.match(cwd);
if (!isInsideProcessCwd) {
  // Look for the local instalation of the CLI and uses that If it fails it uses the current (probably the global)
  try {
    const localModulePath = join(cwd, 'node_modules', '@c8y', 'cli');
    const localModuleOptions = require(join(localModulePath, 'dist', 'options.js')).options;
    const thisModuleOptions = require('./dist/options.js').options;
    Object.assign(localModuleOptions, thisModuleOptions);
    require(join(localModulePath, 'dist', 'cli.js'));
  } catch (e) {
    require('./dist/cli.js');
  }
} else {
  require('./dist/cli.js');
}
