#!/usr/bin/env node

const yargs = require('yargs');
const generate = require('./generate.js');
const { useImage, useLocal } = require('./state.js');

const { argv } = yargs
    .usage('Usage: $0 <command> [options]')
    .command('generate', 'Regenerate Compose file from Maestro')
    .command('use-image [service]', 'Switch a service to image')
    .command('use-local [service]', 'Switch a service to local')
    .demandCommand(1);

switch (argv._[0]) {
    case 'generate':
        generate();
        break;
    case 'use-image':
        useImage([argv.service]);
        break;
    case 'use-local':
        useLocal([argv.service]);
        break;
    default:
        break;
}
