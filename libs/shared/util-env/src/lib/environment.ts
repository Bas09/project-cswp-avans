import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,

  // ROOT_DOMAIN_URL: 'dummy',
  //dataApiUrl: 'http://localhost:3000/api',
  dataApiUrl: 'http://localhost:3100/api',
  MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/project-cswp',
};
