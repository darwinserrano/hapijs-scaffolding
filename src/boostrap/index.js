'use strict';

const Sequelize = require('sequelize');
const config = require('../config/config')
const authentication = require('./authentication');

const boostrap = {
  register: function (server, options, next) {

    server.register([
      require('hapi-auth-jwt2'),
      {
        register: require('hapi-sequelize'),
        options: [{
          name: 'test', // identifier
          models: ['./src/models/pg-test/**/*.js'], // paths/globs to model files
          sequelize: new Sequelize(config.bd.name, config.bd.user, config.bd.pass, config.bd.options), // sequelize instance
          sync: false, // sync models - default false
          forceSync: false
        }]
      }
    ], err => {
      server.auth.strategy('jwt', 'jwt', {
        key: config.secret, // Never Share your secret key
        validateFunc: authentication, // validate function defined above
        verifyOptions: {
          algorithms: ['HS256']
        } // pick a strong algorithm
      });

      server.auth.default('jwt');

      server.register([{
        register: require('hapi-router'),
        options: {
          routes: 'src/routes/**/*.js' // uses glob to include files
        }
      }], err => {
        if (err) throw err;
      });
    });
    next();
  }
};

boostrap.register.attributes = {
  name: 'boostrap',
  version: '1.0.0'
};

module.exports = boostrap;