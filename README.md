# multi-tool-cli <sub><sup>| Install and require multiple versions of NPM packages as dependencies<sup></sub>
[![version](http://img.shields.io/badge/version-0.1.0-blue.svg)](https://www.npmjs.com/package/multi-tool-cli)
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
  Usage
    $ multi-tool install <<name>@<version>> [--path <path>]

  Examples
    $ multi-tool install ramda@0.23.0
    ramda@0.23.0
    $ multi-tool install ramda@0.23.x
    ramda@0.23.x
    $ multi-tool install ramda@~0.22.1
    ramda@~0.22.1
    $ multi-tool install ramda@latest
    ramda@latest
    $ multi-tool install ramda@latest --path /path/to/project/node_modules
    ramda@latest
```

## Maintainers
* Rocky Madden ([@rockymadden](https://github.com/rockymadden))
