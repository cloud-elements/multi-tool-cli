# multi-tool-cli-cli <sub><sup>| Install multiple versions of NPM packages via semver ranges<sup></sub>
[![version](http://img.shields.io/badge/version-0.0.0-blue.svg)](https://www.npmjs.com/package/@cloudelements/multi-tool-cli)
[![versioning](http://img.shields.io/badge/versioning-semver-blue.svg)](http://semver.org/)
[![branching](http://img.shields.io/badge/branching-github%20flow-blue.svg)](https://guides.github.com/introduction/flow/)
[![styling](http://img.shields.io/badge/code%20styling-XO-blue.svg)](https://github.com/sindresorhus/xo)
[![build](https://circleci.com/gh/cloud-elements/multi-tool-cli.svg?style=shield)](https://circleci.com/gh/cloud-elements/multi-tool-cli)

## Install
```javascript
$ npm install --global multi-tool-cli
```

## Usage
```bash
$ multi-tool install ramda@0.23.0
$ multi-tool install ramda@0.23.x
$ multi-tool install ramda@latest
$ multi-tool install ramda@0.22.1 --directory /path/to/project
```
> __PROTIP:__ Any valid semver range that is also a valid \*nix directory name is supported.

## Maintainers
* Rocky Madden ([@rockymadden](https://github.com/rockymadden))
