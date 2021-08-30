const fs = require('fs');
const yaml = require('js-yaml');
const merge = require('lodash.merge');
const columnify = require('columnify');
const chalk = require('chalk');
const sortBy = require('lodash.sortby');

const STATE_PATH = `${process.cwd()}/.docker-maestro.state`;
const MAESTRO_PATH = `./docker-maestro.yml`;

const getState = () => {
    if (fs.existsSync(STATE_PATH)) {
        return yaml.safeLoad(fs.readFileSync(STATE_PATH)) || {};
    }
    fs.closeSync(fs.openSync(STATE_PATH, 'a'));
    return {};
};

const showState = () => {
    if (fs.existsSync(STATE_PATH)) {
        const services = yaml.safeLoad(fs.readFileSync(MAESTRO_PATH)) || {};
        const state = yaml.safeLoad(fs.readFileSync(STATE_PATH)) || {};

        const fullState = merge(
          merge(...Object.keys(services).map((key) => ({ [key]: 'use-image' }))),
          merge(...Object.entries(state).map(([key, value]) => ({ [key]: value })))
        );

        const mappedState = Object.entries(fullState).map(([key, value]) => {
          const config = value === 'use-local' ? chalk.green(value) : value;
          return { service: key, config };
        });

        console.log(columnify(sortBy(mappedState, 'service'), { minWidth: 30 }));
    }
};

const resetState = () => {
    fs.closeSync(fs.openSync(STATE_PATH, 'w'));
};

const writeState = (state) => {
    fs.writeFileSync(STATE_PATH, yaml.safeDump(state));
};

const getServices = () => {
    if (fs.existsSync(MAESTRO_PATH)) {
        return yaml.safeLoad(fs.readFileSync(`${MAESTRO_PATH}`));
    }
    console.log('No docker-maestro.yml found.');
    process.exit(1);
};

module.exports = { getState, getServices, writeState, showState, resetState };
