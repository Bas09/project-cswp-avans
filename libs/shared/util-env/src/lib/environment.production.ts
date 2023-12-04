import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,

  // ROOT_DOMAIN_URL: 'https://agreeable-tree-0c8fbd903.4.azurestaticapps.net',
  // dataApiUrl: 'https://data-api-cswp.azurewebsites.net/api',
  dataApiUrl: 'dummy',
  MONGO_DB_CONNECTION_STRING: 'mongodb://remote-host/mongodb',
};
