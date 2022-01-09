import { Sequelize } from 'sequelize-typescript';
import config from '../config';
import models from '../database/models';

class DBSequelize {
  public instanceSequelize: Sequelize;

  constructor() {
    this.instanceSequelize = new Sequelize({
      ...config.SEQUELIZE_CONFIG,
    });
  }

  async init() {
    this.instanceSequelize.addModels(Object.values(models));
    this.instanceSequelize.authenticate();
    await this.instanceSequelize.sync();
    console.log('Drop and re-sync db.');

    return {
      models,
      instanceSequelize: this.instanceSequelize,
    };
  }
}

export default new DBSequelize().init();
