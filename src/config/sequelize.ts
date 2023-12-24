import {Sequelize} from 'sequelize';
import {dbConfig} from './app';

const {username, password, database} = dbConfig;
export default new Sequelize(
  database || '',
  username || '',
  password || '',
  dbConfig
);
