#!/bin/bash
// >&/dev/null;exec node --harmony $0 $@
'use strict';

const findup = require('findup-sync');
const meow = require('meow');
const install = require('multi-tool');
const {allPass, anyPass, complement, equals, isEmpty, isNil, match, test} = require('ramda');
const validFilename = require('valid-filename');

const name = 'multi-tool';

const cli = meow(`
  Usage
    $ ${name} install <<name>@<version>> [--directory <path>]

  Examples
    $ ${name} install ramda@0.23.0
    ramda@0.23.0
    $ ${name} install ramda@0.23.x
    ramda@0.23.x
    $ ${name} install ramda@latest
    ramda@latest
    $ ${name} install ramda@latest --directory /path/to/project/node_modules
    ramda@latest
`);

const cmd = cli.input[0];
const pkg = cli.flags.package || cli.input[1];
const directory = cli.flags.directory || cli.input[2];

const dir = directory ? findup('node_modules', {cwd: directory}) : findup('node_modules');
const regexPkg = /^(.+)@(.+)$/;

const validCmd = anyPass([equals('install')]);
const validDir = complement(isNil);
const validPkg = allPass([validFilename, test(regexPkg)]);

if (!validCmd(cmd)) {
  cli.showHelp(2);
} else if (!validPkg(pkg)) {
  cli.showHelp(3);
} else if (!validDir(dir)) {
  cli.showHelp(4);
}

const [, pkgName, pkgVersion] = match(regexPkg, pkg);

install(pkgName, pkgVersion, dir)
  .then(installed => {
    if (isNil(installed) || isEmpty(installed)) {
      cli.showHelp(1);
    } else {
      console.log(installed);
      process.exit(0);
    }
  });
