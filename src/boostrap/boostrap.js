'use strict';

const Sequelize = require('sequelize');
const config = require('../config/config.json')

const boostrap = {
  register: function (server, options, next) {

    server.register([{
      register: require('hapi-sequelize'),
      options: [{
        name: 'test', // identifier
        models: ['./src/models/sequelize/**/*.js'], // paths/globs to model files
        sequelize: new Sequelize(config.bd.name, config.bd.user, config.bd.pass, config.bd.options), // sequelize instance
        sync: false, // sync models - default false
        forceSync: false
      }]
    }], err => {
      if (err) throw err;
    });

    next();
  }
};

boostrap.register.attributes = {
  name: 'boostrap',
  version: '1.0.0'
};

module.exports = boostrap;