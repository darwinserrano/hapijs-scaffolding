import * as Hapi from "hapi";

export interface IPlugin {
  (server: Hapi.Server, options?: any, next?: any);
  attributes?: IPluginInfo;
}

export interface IPluginInfo {
  name: string;
  version: string;
}