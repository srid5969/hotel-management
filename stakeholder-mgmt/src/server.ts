import {app} from './app';
import {logger} from './util';
import sequelize from './config/sequelize';
sequelize
  .authenticate()
  .then(() => {
    logger.info('DB_CONNECTED', 'SUCCESS');
  })
  .catch((error: any) => {
    logger.error('DB_CONNECTION_FAILED', error);
  });

const server = app.listen(app.get('port'), async () => {
  logger.info(
    'APP_START',
    `App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  );
});

process.on('uncaughtException', error => {
  logger.error('UNHANDLED_REJECTION', error);
});

export default server;
