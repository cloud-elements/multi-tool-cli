#!/usr/bin/env node
'use strict';

const findup = require('findup-sync');
const meow = require('meow');
const {anyPass, complement, equals, isEmpty, isNil, match, test} = require('ramda');

const pkgRegex = /^(.+)@(.+)$/;
const pkgLike = test(pkgRegex);

const validCmd = anyPass([equals('install')]);
const validPath = complement(isNil);

const name = 'multi-tool';
const cli = meow(`
Usage:
  $ ${name} install <[--package ]<package>> [--path <path>]

Subcommands:
  install  Install package to path

Options:
  --package  The package name and version to install (default: undefined)
  --path     The path where to install (default: current directory or the
             nearest ancestor node_modules directory)

Examples:
  $ ${name} install ramda@0.23.0
  ramda@0.23.0
  $ ${name} install ramda@0.23.x
  ramda@0.23.0
  $ ${name} install ramda@~0.22.1
  ramda@~0.22.1
  $ ${name} install ramda@latest
  ramda@latest
  $ ${name} install ramda@latest --path /path/to/project/node_modules
  ramda@latest
`);

const cmd = cli.input[0];
const pkg = cli.flags.package || cli.input[1];
const path = cli.flags.path || cli.input[2];

const pth = path ? findup('node_modules', {cwd: path}) : findup('node_modules');
const install = require('multi-tool')(pth);

const {validName, validVersion} = install;

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
