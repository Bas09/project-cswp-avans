import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,

  ROOT_DOMAIN_URL: 'https://agreeable-tree-0c8fbd903.4.azurestaticapps.net',
  dataApiUrl: 'https://nxworkshop.azurewebsites.net/api',

  MONGO_DB_CONNECTION_STRING: 'mongodb://remote-host/mongodb',
};
