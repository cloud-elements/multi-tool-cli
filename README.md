# multi-tool-cli <sub><sup>| Install and require multiple versions of NPM packages<sup></sub>
[![version](http://img.shields.io/badge/version-0.2.0-blue.svg)](https://www.npmjs.com/package/multi-tool-cli)
[![versioning](http://img.shields.io/badge/versioning-semver-blue.svg)](http://semver.org/)
[![branching](http://img.shields.io/badge/branching-github%20flow-blue.svg)](https://guides.github.com/introduction/flow/)
[![styling](http://img.shields.io/badge/styling-xo-blue.svg)](https://github.com/sindresorhus/xo)
[![build](https://circleci.com/gh/cloud-elements/multi-tool-cli.svg?style=shield)](https://circleci.com/gh/cloud-elements/multi-tool-cli)

## Install
```javascript
$ npm install --global multi-tool-cli
```

## Usage
```bash
$ multi-tool --help
Install and require multiple versions of NPM packages

Usage:
  $ multi-tool install <[--package ]<package>> [--path <path>]

Subcommands:
  install  Install a package in a path

Options:
  --package  The package name and version to install (default: undefined)
  --path     The path where to install (default: current directory or the
             nearest ancestor node_modules directory)

Examples:
  $ multi-tool install ramda@0.23.0
  ramda@0.23.0
  $ multi-tool install ramda@0.23.x
  ramda@0.23.0
  $ multi-tool install ramda@~0.22.1
  ramda@~0.22.1
  $ multi-tool install ramda@latest
  ramda@latest
  $ multi-tool install ramda@latest --path /path/to/project/node_modules
  ramda@latest
```

## Maintainers
* Rocky Madden ([@rockymadden](https://github.com/rockymadden))
