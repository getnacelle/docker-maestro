import os from 'os';
import fs from 'fs';
import yaml from 'js-yaml';

const STATE_PATH = `${os.homedir()}/.docker-maestro.state`;
const MAESTRO_PATH = `./docker-maestro.yml`;

export function getState() {
    if (fs.existsSync(STATE_PATH)) {
        return yaml.safeLoad(fs.readFileSync(STATE_PATH)) || {};
    }
    fs.closeSync(fs.openSync(STATE_PATH, 'a'));
    return {};
}

export function writeState(state) {
    fs.writeFileSync(STATE_PATH, yaml.safeDump(state));
}

export function getServices() {
    if (fs.existsSync(MAESTRO_PATH)) {
        return yaml.safeLoad(fs.readFileSync('./docker-maestro.yml'));
    }
    console.log('No docker-maestro.yml found.');
    process.exit(1);
}
