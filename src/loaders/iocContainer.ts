import { Container } from 'typedi';

const iocLoader = async (models, sequelize, logger) => {
  try {
    Container.set('models', models);
    Container.set('sequelize', sequelize);
    Container.set('logger', logger);
  } catch (error: any) {
    logger.error('😱 Failed to load dependency injector');
    throw new Error(error);
  }
};

export default iocLoader;
