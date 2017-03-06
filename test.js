'use strict';

const test = require('ava');
const {shell} = require('execa');

const cli = './index.js';

test.before(async () => await shell('npm prune'));

test.serial('installing via latest match should work', async t => {
	const installed = await shell(`${cli} install ramda@latest`);

	t.is(installed.code, 0);
	t.is(installed.stdout, 'ramda@latest');
});

test.serial('installing via exact match should work', async t => {
	const installed = await shell(`${cli} install ramda@0.23.0`);

	t.is(installed.code, 0);
	t.is(installed.stdout, 'ramda@0.23.0');
});

test.serial('installing via x-range match should work', async t => {
	const installed = await shell(`${cli} install ramda@0.23.x`);

	t.is(installed.code, 0);
	t.is(installed.stdout, 'ramda@0.23.x');
});

test.serial('installing via tilde-range match should work', async t => {
	const installed = await shell(`${cli} install ramda@~0.22.1`);

	t.is(installed.code, 0);
	t.is(installed.stdout, 'ramda@~0.22.1');
});

test.serial('installing non-existent package should exit 1', async t => {
	t.plan(1);

	try {
		await shell(`${cli} install ramda@99.99.99`);
	} catch (err) {
		t.is(err.code, 1);
	}
});

test.serial('invalid subcommand should exit 2', async t => {
	t.plan(1);

	try {
		await shell(`${cli} installit ramda@0.23.0`);
	} catch (err) {
		t.is(err.code, 2);
	}
});

test.serial('invalid package should exit 3', async t => {
	t.plan(2);

	try {
		await shell(`${cli} install ramda`);
	} catch (err) {
		t.is(err.code, 3);
	}

	try {
		await shell(`${cli} install 'ramda@>=0.23.0'`);
	} catch (err) {
		t.is(err.code, 3);
	}
});

test.serial('invalid path should exit 4', async t => {
	t.plan(1);

	try {
		await shell(`${cli} install ramda@0.23.0 --path /tmp`);
	} catch (err) {
		t.is(err.code, 4);
	}
});
