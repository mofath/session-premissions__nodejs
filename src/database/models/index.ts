import * as Sequelize from 'sequelize';

import User from './User';
import Session from './Session';

export interface IModels {
  [key: string]: any;
}

const models: IModels = {
  User,
  Session,
};

export default models;
