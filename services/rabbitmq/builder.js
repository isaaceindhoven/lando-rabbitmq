'use strict';

module.exports = {
    name: 'rabbitmq',
    config: {
        version: '3.9-management',
        supported: [
            '3.8',
            '3.8-management',
            '3.9',
            '3.9-management',
        ],
        creds: {
            user: 'user',
            password: 'user'
        },
        confSrc: __dirname,
        healthcheck: 'rabbitmq-diagnostics -q ping'
    },
    parent: '_service',
    builder: (parent, config) => class LandoRabbitmq extends parent {
        constructor(id, options = {}) {
            options = {...config, ...options};
            const rabbitmq = {
                image: `rabbitmq:${options.version}-alpine`,
                command: 'rabbitmq-server',
                environment: {
                    RABBITMQ_DEFAULT_USER: options.creds.user,
                    RABBITMQ_DEFAULT_PASS: options.creds.password
                }
            };

            super(id, options, {services: {[options.name]: rabbitmq}});
        };
    },
};
