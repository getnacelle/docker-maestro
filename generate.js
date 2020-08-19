const yaml = require('js-yaml');
const fs = require('fs');
const merge = require('lodash.merge');
const { getState, getServices } = require('./utils.js');

const buildServices = (config) => {
    const STATE = getState();
    const returnObject = {};

    Object.entries(config).map(([key, value]) => {
        if (key === 'volumes') return;
        if (key === 'networks') return;

        returnObject[key] = merge(returnObject[key], value['use-always']);

        if (!STATE[key] || STATE[key] === 'use-image') {
            returnObject[key] = merge(returnObject[key], value['use-image']);
        }

        if (STATE[key] === 'use-local') {
            returnObject[key] = merge(returnObject[key], value['use-local']);
        }
    });

    return returnObject;
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

    if (services.networks) {
        composed.networks = services.networks;
    }

    try {
        fs.writeFileSync('docker-compose.yml', yaml.safeDump(composed));
    } catch (e) {
        console.log(e);
    }

    console.log('Docker-Compose file generated');
};

module.exports = generate;
