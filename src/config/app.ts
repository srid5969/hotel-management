import dotenv from 'dotenv';
import {Options} from 'sequelize';
dotenv.config();

export const environment = process.env.NODE_ENV;
export const appConfig = {
  port: process.env.PORT || 3000,
  serviceName: process.env.SERVICE_NAME || 'APP_SERVICE',
};

export const dbConfig: Options = {
  username: process.env.DB_USERNAME || 'SA',
  password: process.env.DB_PASSWORD || 'Admin@123',
  database: process.env.DB_NAME || 'ITC',
  host: process.env.DB_HOST || 'localhost',
  pool: {max: 60},
  dialect: 'mssql',
};
export const sendGridAPIkey = process.env.SENDGRID_API_KEY || '';
