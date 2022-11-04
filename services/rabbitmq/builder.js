'use strict';

module.exports = {
    name: 'rabbitmq',
    config: {
        supported: [
            '3.9',
            '3.10',
            '3.11',
        ],
        patchesSupported: true,
        creds: {
            user: 'user',
            password: 'user'
        },
        persist: false,
        port: '5672',
        confSrc: __dirname,
        healthcheck: 'rabbitmq-diagnostics -q ping',
        
        // Custom config.
        management: true,
        alpine: true,
    },
    parent: '_service',
    builder: (parent, config) => class LandoRabbitmq extends parent {
        constructor(id, options = {}) {
            options = {...config, ...options};

            console.log(options);

            const image =  `rabbitmq:${options.version}${options.management ? '-management' : ''}${options.alpine ? '-alpine' : ''}`;
            const ports = ['5672'];
            if (options.management) {
                ports.push('15672');
            }
            
            const environment = {
                RABBITMQ_DEFAULT_USER: options.creds.user,
                RABBITMQ_DEFAULT_PASS: options.creds.password
            };

            const rabbitmq = {
                image,
                command: 'rabbitmq-server',
                ports,
                environment,
            };

            super(id, options, {services: {[options.name]: rabbitmq}});
        };
    },
};
