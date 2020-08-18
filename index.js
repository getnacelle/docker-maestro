#!/bin/sh
':' //# comment; exec /usr/bin/env node --experimental-modules "$0" "$@"

import yargs from 'yargs';
import generate from './generate.js';
import { useImage, useLocal } from './state.js';

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
    case 'use-lmage':
        useLocal([argv.service]);
        break;
    default:
        console.log(1);
        break;
}
