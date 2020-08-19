const os = require('os');
const fs = require('fs');
const yaml = require('js-yaml');

const STATE_PATH = `${os.homedir()}/.docker-maestro.state`;
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
        const state = yaml.safeLoad(fs.readFileSync(STATE_PATH)) || {};
        Object.entries(state).map(([key, value]) => {
            console.log(`${key}\t${value}`);
        });
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
        return yaml.safeLoad(fs.readFileSync('./docker-maestro.yml'));
    }
    console.log('No docker-maestro.yml found.');
    process.exit(1);
};

module.exports = { getState, getServices, writeState, showState, resetState };
