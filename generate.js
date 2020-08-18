import yaml from 'js-yaml';
import fs from 'fs';
import merge from 'lodash.merge';
import { getState, getServices } from './utils.js';

const STATE = getState();

const buildServices = (config) => {
    const returnObject = {};

    Object.entries(config).map(([key, value]) => {
        if (key === 'volumes') return;

        returnObject[key] = merge(returnObject[key], value['use-always']);

        if (STATE[key] === 'use-image') {
            returnObject[key] = merge(returnObject[key], value['use-image']);
        }

        if (STATE[key] === 'use-local') {
            returnObject[key] = merge(returnObject[key], value['use-local']);
        }
    });

    return returnObject;
};

const dumpYaml = (yamlString) => {
    try {
        fs.writeFileSync('docker-compose.yml', yamlString);
    } catch (e) {
        console.log(e);
    }
};

const generate = () => {
    const services = getServices();
    const built = buildServices(services);
    const composed = {
        version: '3',
        services: built,
    };

    if (services.volumes) {
        composed.volumes = services.volumes;
    }

    dumpYaml(yaml.safeDump(composed));
};

export default generate;
