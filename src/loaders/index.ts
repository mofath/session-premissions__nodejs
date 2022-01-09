import { Application } from 'express';
import iocLoader from './iocContainer';
import sequelizeLoader from './sequelize';
import expressLoader from './express';
import logger from '../core/logger';

interface MyApp {
  start: () => Promise<void>;
}

const loader = async (app: Application) => {
  const { models, instanceSequelize: sqlz } = await sequelizeLoader;
  iocLoader(models, sqlz, logger);

  const myApp: MyApp = {
    start: async (params: Object = {}) => {
      await expressLoader(app);
    },
  };

  return myApp;
};

export default loader;
