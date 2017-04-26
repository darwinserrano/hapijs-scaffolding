'use strict';
import * as Hapi from 'hapi';
import * as Sequelize from 'sequelize';
import config from '../config/config';
import * as authentication from './authentication';
import * as HapiAuthJwt2 from 'hapi-auth-jwt2';
import * as HapiSequelize from 'hapi-sequelize';
import * as HapiRouter from 'hapi-router';
import { IPlugin, IPluginRegister } from '../interfaces';

class Boostrap implements IPlugin {
  constructor() {
    this.register.attributes = {
      name: 'boostrap',
      version: '1.0.0'
    }
  }

  register: IPluginRegister = (server: Hapi.Server, options: any, next: any) => {
    server.register({
      register: HapiSequelize,
      options: [{
        name: 'test', // identifier
        models: ['./dist/models/pg-test/**/*.js'], // paths/globs to model files
        sequelize: new Sequelize(config.bd.name, config.bd.user, config.bd.pass, config.bd.options), // sequelize instance
        sync: false, // sync models - default false
        forceSync: false
      }]
    });

    server.register(HapiAuthJwt2, err => {
      server.auth.strategy('jwt', 'jwt', {
        key: config.secret, // Never Share your secret key
        validateFunc: authentication, // validate function defined above
        verifyOptions: {
          algorithms: ['HS256']
        } // pick a strong algorithm
      });

      server.auth.default('jwt');

      server.register({
        register: HapiRouter,
        options: {
          routes: 'dist/routes/**/*.js' // uses glob to include files
        }
      }, err => {
        if (err) throw err;
      });
    });
    return next();
  }
}

export const boostrap = new Boostrap();