#!/bin/bash
// >&/dev/null;exec node --harmony $0 $@
'use strict';

const findup = require('findup-sync');
const meow = require('meow');
const install = require('multi-tool');
const {anyPass, complement, equals, isEmpty, isNil, match, test} = require('ramda');

const pkgRegex = /^(.+)@(.+)$/;
const pkgLike = test(pkgRegex);

const validCmd = anyPass([equals('install')]);
const validPath = complement(isNil);
const {validName, validVersion} = install;

const name = 'multi-tool';
const cli = meow(`
  Usage
    $ ${name} install <<name>@<version>> [--path <path>]

  Examples
    $ ${name} install ramda@0.23.0
    ramda@0.23.0
    $ ${name} install ramda@0.23.x
    ramda@0.23.x
    $ ${name} install ramda@latest
    ramda@latest
    $ ${name} install ramda@latest --path /path/to/project/node_modules
    ramda@latest
`);

const cmd = cli.input[0];
const pkg = cli.flags.package || cli.input[1];
const path = cli.flags.path || cli.input[2];

const pth = path ? findup('node_modules', {cwd: path}) : findup('node_modules');

if (!validCmd(cmd)) {
  cli.showHelp(2);
} else if (!pkgLike(pkg)) {
  cli.showHelp(3);
} else if (!validPath(pth)) {
  cli.showHelp(4);
}

const [, pkgName, pkgVersion] = match(pkgRegex, pkg);

if (!validName(pkgName) || !validVersion(pkgVersion)) {
  cli.showHelp(3);
}

install(pkgName, pkgVersion, path).then(installed => {
  if (isNil(installed) || isEmpty(installed)) {
    cli.showHelp(1);
  } else {
    console.log(installed);
    process.exit(0);
  }
});
