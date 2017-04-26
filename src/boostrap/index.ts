'use strict';
import * as Hapi from 'hapi';
import * as Sequelize from 'sequelize';
import config from '../config/config';
import * as authentication from './authentication';
import * as HapiAuthJwt2 from 'hapi-auth-jwt2';
import * as HapiSequelize from 'hapi-sequelize';
import * as HapiRouter from 'hapi-router';
import { IPlugin } from '../interfaces';

class Boostrap {
  constructor() {
    this.register.attributes = {
      name: 'boostrap',
      version: '1.0.0'
    };
  }

  register: IPlugin = (server: Hapi.Server, options: any, next: any) => {
    server.register([
      HapiAuthJwt2,
      {
        register: HapiSequelize,
        options: [{
          name: 'test', // identifier
          models: ['./dist/models/pg-test/**/*.js'], // paths/globs to model files
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
        register: HapiRouter,
        options: {
          routes: 'dist/routes/**/*.js' // uses glob to include files
        }
      }], err => {
        if (err) throw err;
      });
    });

    server.bind(this);
    this._register(server, options);
    next();
  };

  private _register(server, options) {
    // Register
    return 'register';
  }
}

export default new Boostrap();