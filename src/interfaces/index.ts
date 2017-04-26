import * as Hapi from "hapi";

export interface IPluginRegister {
  (server: Hapi.Server, options?: any, next?: any);
  attributes?: IPluginInfo;
}

export interface IPluginInfo {
  name: string;
  version: string;
}

export interface IPlugin {
  register: IPluginRegister;
}